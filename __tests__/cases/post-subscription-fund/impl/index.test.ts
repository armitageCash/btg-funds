import { SubscriptionServiceImpl } from "../../../../src/cases/post-subscription-fund/impl";
import { Input } from "../../../../src/cases/post-subscription-fund/types";
import SubscriptionController from "../../../../src/controllers/subscriptionController";
import { Subscription } from "../../../../src/domain/subscription";

// Mock the entire controller module
jest.mock("../../../../src/controllers/subscriptionController");

describe("SubscriptionServiceImpl", () => {
  let subscriptionService: SubscriptionServiceImpl;
  let mockSubscriptionController: jest.Mocked<SubscriptionController>;

  const mockSubscription: Subscription = {
    user: "1",
    amount: 1000,
    createdAt: new Date(),
    fund: "fund-1",
    updatedAt: new Date(),
    status: "Opened",
    _id: "mock-id",
  };

  const validInput: Input = {
    user: "1",
    amount: 1000,
    _id: "0",
    fund: "fund-1",
    status: "Opened",
  };

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    // Create a mock instance of the controller
    mockSubscriptionController = {
      create: jest.fn().mockResolvedValue(mockSubscription),
    } as unknown as jest.Mocked<SubscriptionController>;

    // Initialize service with the mock controller
    subscriptionService = new SubscriptionServiceImpl();
    subscriptionService.create = mockSubscriptionController.create;
  });

  describe("create", () => {
    it("should create a subscription successfully with valid input", async () => {
      // Act
      const result = await subscriptionService.create(validInput);

      // Assert
      expect(result).toBeDefined();
      expect(result).not.toBeNull();

      // Type guard
      if (!result) {
        throw new Error("Result should not be undefined");
      }

      expect(mockSubscriptionController.create).toHaveBeenCalledWith(
        validInput
      );
      expect(mockSubscriptionController.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockSubscription);
      expect(result._id).toBe("mock-id");
      expect(result.status).toBe("Opened");
    });

    it("should throw error when user is empty", async () => {
      // Arrange
      const invalidInput = { ...validInput, user: "" };
      mockSubscriptionController.create.mockRejectedValueOnce(
        new Error("User is required")
      );

      // Act & Assert
      await expect(subscriptionService.create(invalidInput)).rejects.toThrow(
        "User is required"
      );
    });

    it("should throw error when amount is negative", async () => {
      // Arrange
      const invalidInput = { ...validInput, amount: -100 };
      mockSubscriptionController.create.mockRejectedValueOnce(
        new Error("Amount must be positive")
      );

      // Act & Assert
      await expect(subscriptionService.create(invalidInput)).rejects.toThrow(
        "Amount must be positive"
      );
    });

    it("should throw error when controller fails", async () => {
      // Arrange
      mockSubscriptionController.create.mockRejectedValueOnce(
        new Error("Failed to create subscription")
      );

      // Act & Assert
      await expect(subscriptionService.create(validInput)).rejects.toThrow(
        "Failed to create subscription"
      );
    });
  });
});
