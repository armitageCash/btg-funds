import SubscriptionController from "../../src/controllers/subscriptionController";
import { SubscriptionRepository } from "../../src/repositories/subscriptionRepository";
import { TransactionRepository } from "../../src/repositories/transactionRepository";
import { WalletRepository } from "../../src/repositories/walletRepository";
import EmailService from "../../src/services/email";
import { Input as InputUpdate } from "../../src/cases/put-subscription-fund/types";

jest.mock("../../src/repositories/subscriptionRepository");
jest.mock("../../src/repositories/transactionRepository");
jest.mock("../../src/repositories/walletRepository");
jest.mock("../../src/services/email");

describe("SubscriptionController::update", () => {
  let subscriptionController: SubscriptionController;

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    subscriptionController = new SubscriptionController();
  });

  it("should update a subscription and send an email", async () => {
    const input: InputUpdate = {
      user: "userId",
      fund: "fundId",
      amount: 100,
      status: "Opened",
      _id: "subscriptionId",
    };

    const subscriptionMock = {
      _id: "subscriptionId",
      amount: input.amount,
      status: input.status,
      populate: jest.fn().mockResolvedValue({
        _id: "subscriptionId",
        user: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          wallet: { _id: "walletId", balance: 1000 },
        },
        fund: { name: "Fund Name" },
      }),
    };

    const txMock = {
      _id: "transactionId",
      subscription: "subscriptionId",
      performance: 150000,
      date: new Date(),
      status: "Opened",
      type: "OUT",
    };

    const walletMock = {
      _id: "walletId",
      balance: 1000,
    };

    (SubscriptionRepository.prototype.updateOne as jest.Mock).mockResolvedValue(
      subscriptionMock
    );
    (TransactionRepository.prototype.createOne as jest.Mock).mockResolvedValue(
      txMock
    );
    (WalletRepository.prototype.findOne as jest.Mock).mockResolvedValue(
      walletMock
    );
    (WalletRepository.prototype.updateOne as jest.Mock).mockResolvedValue({
      ...walletMock,
      balance: 1100,
    });
    (EmailService.prototype.renderTemplate as jest.Mock).mockResolvedValue(
      "emailContent"
    );
    (EmailService.prototype.sendEmail as jest.Mock).mockResolvedValue(
      undefined
    );

    const result = await subscriptionController.update(input);

    expect(result).toBeDefined();
    expect(SubscriptionRepository.prototype.updateOne).toHaveBeenCalledWith(
      input._id,
      input
    );
    expect(TransactionRepository.prototype.createOne).toHaveBeenCalledWith(
      expect.objectContaining({
        subscription: "subscriptionId",
        performance: 150000,
        status: "Opened",
        type: "OUT",
      })
    );
    expect(WalletRepository.prototype.findOne).toHaveBeenCalledWith("walletId");
    expect(WalletRepository.prototype.updateOne).toHaveBeenCalledWith(
      "walletId",
      { balance: 1100 }
    );
    expect(EmailService.prototype.sendEmail).toHaveBeenCalled();
  });
});
