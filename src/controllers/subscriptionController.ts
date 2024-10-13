import { Input as InputCreate } from "@/cases/put-subscription-fund/types";
import { Input as InputUpdate } from "@/cases/put-subscription-fund/types";
import { Subscription, SubscriptionDetailed } from "@/domain/subscription";
import { fundModel } from "@/infrastructure/persistence/mongoose/models/fund";
import { userModel } from "@/infrastructure/persistence/mongoose/models/user";
import { SubscriptionRepository } from "@/repositories/subscriptionRepository";
import { TransactionRepository } from "@/repositories/transactionRepository";
import EmailService from "@/services/email";

export default class SubscriptionController {
  subscriptionRepository: SubscriptionRepository;
  transactionRepository: TransactionRepository;
  mailService: EmailService;

  constructor() {
    this.subscriptionRepository = new SubscriptionRepository();
    this.transactionRepository = new TransactionRepository();
    this.mailService = new EmailService();
  }

  async create(
    params: Omit<InputCreate, "_id">
  ): Promise<Subscription | undefined> {
    try {
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
      return undefined; // Asegúrate de devolver undefined en caso de error
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
            { path: "user", model: userModel },
            { path: "fund", model: fundModel },
          ]);

        const tx = await this.transactionRepository.createOne({
          subscription: subscription._id,
          performance: 150000,
          date: new Date(),
          status: subscription.status,
          type: "OUT",
        });

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
          "Información de actualización de suscripción",
          "",
          msg
        );
      }

      return subscription || undefined;
    } catch (error) {
      console.log("Error actualizando la suscripción:", error);
    }
  }
}
