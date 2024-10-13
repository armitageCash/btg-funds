import SubscriptionController from "../../src/controllers/subscriptionController";
import { SubscriptionRepository } from "../../src/repositories/subscriptionRepository";
import { TransactionRepository } from "../../src/repositories/transactionRepository";
import EmailService from "../../src/services/email";
import { Transaction } from "../../src/domain/transaction";
import { Transaction as Tx } from "../../src/infrastructure/persistence/mongoose/models/transaction";
import { Input as InputCreate } from "../../src/cases/put-subscription-fund/types";

// Mock de las dependencias
jest.mock("../../src/repositories/subscriptionRepository");
jest.mock("../../src/repositories/transactionRepository");
jest.mock("../../src/services/email");

describe("SubscriptionController::create", () => {
  let subscriptionController: SubscriptionController;

  beforeEach(() => {
    jest.resetAllMocks(); // L
    jest.clearAllMocks();
    subscriptionController = new SubscriptionController();
  });

  it("should create a subscription and send an email", async () => {
    const input: Omit<InputCreate, "_id"> = {
      user: "userId",
      fund: "fundId",
      amount: 100,
      status: "Opened",
    };

    // Mockeamos el comportamiento del método createOne de SubscriptionRepository
    const subscriptionMock = {
      _id: "subscriptionId",
      amount: input.amount,
      status: input.status,
      populate: jest.fn().mockResolvedValue({
        _id: "subscriptionId",
        user: { firstName: "John", email: "john@example.com" },
        fund: { name: "Fund Name" },
      }),
    };

    const tx = {
      subscription: "subscriptionId",
      performance: 150000,
      date: new Date(),
      status: "Opened",
      type: "IN",
    };

    (SubscriptionRepository.prototype.createOne as jest.Mock).mockResolvedValue(
      subscriptionMock
    );
    (TransactionRepository.prototype.createOne as jest.Mock).mockResolvedValue(
      tx
    );
    (EmailService.prototype.renderTemplate as jest.Mock).mockResolvedValue(
      "emailContent"
    );
    (EmailService.prototype.sendEmail as jest.Mock).mockImplementation(
      (email, subject, text, html) => {
        console.log("sendEmail called with:", email, subject, text, html);
      }
    );

    const result = await subscriptionController.create(input);

    expect(result).toBeDefined();
    expect(SubscriptionRepository.prototype.createOne).toHaveBeenCalledWith(
      input
    );
    expect(subscriptionMock.populate).toHaveBeenCalled();
    expect(TransactionRepository.prototype.createOne).toHaveBeenCalledWith(
      expect.objectContaining(tx)
    );
    expect(EmailService.prototype.sendEmail).toHaveBeenCalled();
  });
});

describe("SubscriptionController::update", () => {
  let subscriptionController: SubscriptionController;

  beforeEach(() => {
    jest.resetAllMocks(); // L
    jest.clearAllMocks();
    subscriptionController = new SubscriptionController();
  });

  it("should update a subscription and send an email", async () => {
    const input: InputCreate = {
      user: "userId",
      fund: "fundId",
      amount: 100,
      status: "Opened",
      _id: "0",
    };

    // Mockeamos el comportamiento del método createOne de SubscriptionRepository
    const subscriptionMock = {
      _id: "subscriptionId",
      amount: input.amount,
      status: input.status,
      populate: jest.fn().mockResolvedValue({
        _id: "subscriptionId",
        user: { firstName: "John", email: "john@example.com" },
        fund: { name: "Fund Name" },
      }),
    };

    const tx = {
      _id: "0",
      subscription: "subscriptionId",
      performance: 150000,
      date: new Date(),
      status: "Opened",
      type: "OUT",
    };

    (SubscriptionRepository.prototype.updateOne as jest.Mock).mockResolvedValue(
      subscriptionMock
    );
    (TransactionRepository.prototype.createOne as jest.Mock).mockResolvedValue(
      tx
    );
    (EmailService.prototype.renderTemplate as jest.Mock).mockResolvedValue(
      "emailContent"
    );
    (EmailService.prototype.sendEmail as jest.Mock).mockImplementation(
      (email, subject, text, html) => {
        console.log("sendEmail called with:", email, subject, text, html);
      }
    );

    const result = await subscriptionController.update(input);

    expect(result).toBeDefined();
    expect(TransactionRepository.prototype.createOne).toHaveBeenCalledWith(
      expect.objectContaining({
        subscription: "subscriptionId",
        performance: 150000,
        status: "Opened",
        type: "OUT", // Verificamos que el tipo sea "OUT"
      })
    );
    expect(EmailService.prototype.sendEmail).toHaveBeenCalled();
  });
});
