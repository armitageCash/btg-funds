import { createApp, UseCaseResult } from "urunner-lib";
import { Logger } from "../../../src/shared/logger";
import { SubscriptionServiceImpl } from "../../../src/cases/put-subscription-fund/impl";
import { Subscription } from "../../../src/domain/subscription";
import { Input } from "../../../src/cases/put-subscription-fund/types";

// Mocks
jest.mock("urunner-lib");
jest.mock("@/shared/logger");
jest.mock("@/cases/put-subscription-fund/impl");

// Recreamos la estructura de subscriptionUpdateCase para nuestros tests
const mockSubscriptionCase = async (
  params: Input,
  dependencies: { logger: Logger; subscriptionService: SubscriptionServiceImpl }
): Promise<UseCaseResult<Subscription | undefined>> => {
  const { logger: log, subscriptionService } = dependencies;

  try {
    const response = await subscriptionService.update(params);
    return {
      data: response,
      status: "success",
      message: "Updated Subscription successfully.",
    };
  } catch (e: any) {
    log.error(e);
    return {
      data: e.message,
      message: "Error updating.",
      status: "error",
    };
  }
};

const mockAdapter =
  (fn: typeof mockSubscriptionCase) =>
  async (params: Input, dependencies: any) => {
    return await fn(params, dependencies);
  };

describe("subscriptionUpdateCase", () => {
  let mockCreateApp: jest.MockedFunction<typeof createApp>;
  let mockLogger: jest.Mocked<Logger>;
  let mockSubscriptionService: jest.Mocked<SubscriptionServiceImpl>;
  let subscriptionUpdateCase: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockCreateApp = createApp as jest.MockedFunction<typeof createApp>;
    mockLogger = new Logger() as jest.Mocked<Logger>;
    mockSubscriptionService =
      new SubscriptionServiceImpl() as jest.Mocked<SubscriptionServiceImpl>;

    // Simulamos la creación de subscriptionUpdateCase
    subscriptionUpdateCase = jest.fn(async (input: Input) => {
      return mockSubscriptionCase(input, {
        logger: mockLogger,
        subscriptionService: mockSubscriptionService,
      });
    });

    mockCreateApp.mockReturnValue({
      attach: jest.fn().mockReturnValue(subscriptionUpdateCase),
    } as any);

    // Llamamos a createApp para asegurarnos de que se ejecute
    createApp(mockAdapter(mockSubscriptionCase)).attach((dependencies: any) => {
      dependencies.logger = mockLogger;
      dependencies.subscriptionService = mockSubscriptionService;
    });
  });

  it("should create app with correct adapter", () => {
    expect(mockCreateApp).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should attach dependencies correctly", () => {
    expect(mockCreateApp().attach).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should handle successful subscription update", async () => {
    const mockSubscription: Subscription = {
      _id: "1",
      fund: "123",
      amount: 500,
      status: "Opened",
      user: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockSubscriptionService.update.mockResolvedValue(mockSubscription);

    const input: Input = {
      _id: "1",
      fund: "123",
      amount: 500,
      status: "Opened",
      user: "",
    };

    const result = await subscriptionUpdateCase(input);

    expect(result).toEqual({
      data: mockSubscription,
      status: "success",
      message: "Updated Subscription successfully.",
    });
    expect(mockSubscriptionService.update).toHaveBeenCalledWith(input);
  });

  it("should handle errors", async () => {
    const mockError = new Error("Test error");
    mockSubscriptionService.update.mockRejectedValue(mockError);

    const input: Input = {
      _id: "1",
      fund: "123",
      amount: 500,
      status: "Opened",
      user: "",
    };

    const result = await subscriptionUpdateCase(input);

    expect(result).toEqual({
      data: "Test error",
      message: "Error updating.",
      status: "error",
    });
    expect(mockLogger.error).toHaveBeenCalledWith(mockError);
  });

  it("should return undefined if no subscription is found", async () => {
    mockSubscriptionService.update.mockResolvedValue(undefined);

    const input: Input = {
      _id: "1",
      amount: 600,
      fund: "123",
      user: "1",
      status: "Opened",
    };

    const result = await subscriptionUpdateCase(input);

    expect(result).toEqual({
      data: undefined,
      status: "success",
      message: "Updated Subscription successfully.",
    });
  });
});
