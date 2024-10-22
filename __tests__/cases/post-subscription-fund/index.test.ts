import { subscriptionCreateCase } from "../../../src/cases/post-subscription-fund";
import { Logger } from "../../../src/shared/logger";
import { SubscriptionServiceImpl } from "../../../src/cases/post-subscription-fund/impl";
import { Input } from "../../../src//cases/post-subscription-fund/types";
import { Subscription } from "../../../src//domain/subscription";

// Mock de las dependencias
jest.mock("@/shared/logger");
jest.mock("@/cases/post-subscription-fund/impl");

describe("subscriptionCreateCase", () => {
  let mockLogger: jest.Mocked<Logger>;
  let mockSubscriptionService: jest.Mocked<SubscriptionServiceImpl>;
  let dependencies: {
    logger: Logger;
    subscriptionService: SubscriptionServiceImpl;
  };

  beforeEach(() => {
    // Inicializamos los mocks
    mockLogger = new Logger() as jest.Mocked<Logger>;
    mockLogger.info = jest.fn();
    mockLogger.error = jest.fn();

    mockSubscriptionService =
      new SubscriptionServiceImpl() as jest.Mocked<SubscriptionServiceImpl>;
    mockSubscriptionService.create = jest.fn();

    dependencies = {
      logger: mockLogger,
      subscriptionService: mockSubscriptionService,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a subscription successfully", async () => {
    // Valores de entrada y resultado esperado
    const params: Input = {
      _id: "1",
      amount: 1000,
      user: "",
      fund: "",
      status: "Opened",
    }; // Ejemplo de input
    const mockSubscription: Subscription = {
      _id: "sub_123",
      user: "",
      amount: 1000,
      createdAt: new Date(),
      fund: "",
      updatedAt: new Date(),
      status: "Opened",
    };

    mockSubscriptionService.create.mockResolvedValue(mockSubscription);

    // Ejecutamos el caso de uso
    const result = await subscriptionCreateCase(params, dependencies);

    // Afirmaciones
    expect(mockSubscriptionService.create).toHaveBeenCalledWith(params);
    expect(result).toEqual({
      data: mockSubscription,
      status: "success",
      message: "Create Subscription succesfully.",
    });

    // Verificamos que el log de información haya sido llamado
    expect(mockLogger.info).toHaveBeenCalledWith(
      "subscriptionCreateCase: ",
      mockSubscription
    );
  });

  it("should handle errors during subscription creation", async () => {
    // Configuramos el mock para lanzar un error
    const params: Subscription = {
      _id: "sub_123",
      user: "",
      amount: 1000,
      createdAt: new Date(),
      fund: "",
      updatedAt: new Date(),
      status: "Opened",
    };
    const mockError = new Error("Service unavailable");

    mockSubscriptionService.create.mockRejectedValue(mockError);

    const result = await subscriptionCreateCase(params, dependencies);

    expect(mockSubscriptionService.create).toHaveBeenCalledWith(params);
    expect(result).toEqual({
      data: mockError.message,
      status: "error",
      message: "Error subscribing .",
    });

    expect(mockLogger.error).toHaveBeenCalledWith(mockError);
  });
});
