import { Input as InputCreate } from "@/cases/put-subscription-fund/types";
import { Input as InputUpdate } from "@/cases/put-subscription-fund/types";
import { Subscription, SubscriptionDetailed } from "@/domain/subscription";
import { SubscriptionSchema } from "@/infrastructure/http/requestSchemas/subscrition";
import { fundModel } from "@/infrastructure/persistence/mongoose/models/fund";
import { userModel } from "@/infrastructure/persistence/mongoose/models/user";
import { walletModel } from "@/infrastructure/persistence/mongoose/models/wallet";
import { FundRepository } from "@/repositories/fundRepository";
import { SubscriptionRepository } from "@/repositories/subscriptionRepository";
import { TransactionRepository } from "@/repositories/transactionRepository";
import { UserRepository } from "@/repositories/userRepository";
import { WalletRepository } from "@/repositories/walletRepository";
import EmailService from "@/services/email";
import Joi from "joi";

export default class SubscriptionController {
  subscriptionRepository: SubscriptionRepository;
  transactionRepository: TransactionRepository;
  fundRepository: FundRepository;
  walletRepository: WalletRepository;
  userRepository: UserRepository;
  mailService: EmailService;

  constructor() {
    this.subscriptionRepository = new SubscriptionRepository();
    this.transactionRepository = new TransactionRepository();
    this.walletRepository = new WalletRepository();
    this.mailService = new EmailService();
    this.userRepository = new UserRepository();
    this.fundRepository = new FundRepository();
  }

  async create(
    params: Omit<InputCreate, "_id">
  ): Promise<Subscription | undefined> {
    try {
      const { error, value } = SubscriptionSchema.validate(params);

      if (error) {
        throw error;
      }

      const fund = await this.fundRepository.findOne(params.fund);

      if (fund) {
        if (params.amount < fund?.minAmount) {
          throw new Error(
            `Amount must be upper or equals than ${fund.minAmount}`
          );
        }
      }

      const subscription = await this.subscriptionRepository.createOne(params);

      await this.transactionRepository.createOne({
        subscription: subscription._id,
        performance: 150000,
        date: new Date(),
        status: subscription.status,
        type: "IN",
      });

      const populatedSubscription: SubscriptionDetailed =
        await subscription.populate([
          { path: "user", model: userModel },
          { path: "fund", model: fundModel },
        ]);

      const msg = await this.mailService.renderTemplate("createSubscription", {
        amount: subscription.amount,
        createdAt: subscription.createdAt,
        fund: populatedSubscription.fund.name,
        status: subscription.status,
        user: `${populatedSubscription.user.firstName} ${populatedSubscription.user.lastName}`,
        updatedAt: new Date(),
      });

      await this.mailService.sendEmail(
        populatedSubscription.user.email,
        "Información de actualización de suscripción",
        populatedSubscription.user.email,
        msg
      );

      if (populatedSubscription) {
        return subscription;
      }

      return undefined;
    } catch (error) {
      console.log("Error creando la suscripción:", error);
      throw error;
    }
  }

  async update(params: InputUpdate): Promise<Subscription | undefined> {
    try {
      const subscription = await this.subscriptionRepository.updateOne(
        params._id,
        params
      );

      if (subscription) {
        const subscriptiondetailed: SubscriptionDetailed =
          await subscription.populate([
            {
              path: "user",
              model: userModel,
              populate: {
                path: "wallet",
                model: walletModel,
              },
            },
            { path: "fund", model: fundModel },
          ]);

        const tx = await this.transactionRepository.createOne({
          subscription: subscription._id,
          performance: 150000,
          date: new Date(),
          status: subscription.status,
          type: "OUT",
        });

        const wallet = await this.walletRepository.findOne(
          subscriptiondetailed.user.wallet._id
        );

        if (wallet) {
          const balance = wallet.balance + subscription.amount;
          await this.walletRepository.updateOne(
            subscriptiondetailed.user.wallet._id,
            {
              balance,
            }
          );
        }

        const msg = await this.mailService.renderTemplate(
          "updateSubscription",
          {
            amount: subscription.amount,
            createdAt: subscription.createdAt,
            fund: subscriptiondetailed.fund.name,
            status: subscription.status,
            user: `${subscriptiondetailed.user.firstName} ${subscriptiondetailed.user.lastName}`,
            updatedAt: new Date(),
          }
        );

        await this.mailService.sendEmail(
          subscriptiondetailed.user.email,
          "Información de actualización de subscripción",
          "",
          msg
        );
      }

      return subscription || undefined;
    } catch (error) {
      throw error;
      console.log("Error actualizando la subscripción:", error);
    }
  }
}
