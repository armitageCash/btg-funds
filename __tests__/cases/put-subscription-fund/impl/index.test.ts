import { Input } from "../../../../src/cases/post-subscription-fund/types";
import SubscriptionController from "../../../../src/controllers/subscriptionController";
import { Subscription } from "../../../../src/domain/subscription";
import { SubscriptionServiceImpl } from "../../../../src/cases/put-subscription-fund/impl";

// Mock de SubscriptionController
jest.mock("@/controllers/subscriptionController");

describe("SubscriptionServiceImpl", () => {
  let subscriptionService: SubscriptionServiceImpl;

  beforeEach(() => {
    subscriptionService = new SubscriptionServiceImpl();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpia los mocks después de cada test
  });

  describe("update method", () => {
    it("should update the subscription and return the result", async () => {
      const mockSubscription: Subscription = {
        _id: "1",
        user: "user123",
        fund: "fund123",
        amount: 1000,
        status: "Opened",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mockeamos la respuesta del método update del SubscriptionController
      (SubscriptionController.prototype.update as jest.Mock).mockResolvedValue(
        mockSubscription
      );

      // Input simulado para la prueba
      const input: Input = {
        _id: "1",
        amount: 1000,
        status: "Opened",
        user: "1",
        fund: "1",
      };

      // Llamamos al servicio
      const result = await subscriptionService.update(input);

      // Comprobamos que devuelve la suscripción esperada
      expect(result).toEqual(mockSubscription);

      // Comprobamos que el método update fue llamado correctamente
      expect(SubscriptionController.prototype.update).toHaveBeenCalledWith(
        input
      );
    });

    it("should return undefined if no subscription is updated", async () => {
      // Mockeamos la respuesta del método update para devolver undefined
      (SubscriptionController.prototype.update as jest.Mock).mockResolvedValue(
        undefined
      );

      // Input simulado para la prueba
      const input: Input = {
        _id: "1",
        amount: 1000,
        status: "Opened",
        user: "1",
        fund: "1",
      };

      // Llamamos al servicio
      const result = await subscriptionService.update(input);

      // Comprobamos que devuelve undefined
      expect(result).toBeUndefined();

      // Comprobamos que el método update fue llamado correctamente
      expect(SubscriptionController.prototype.update).toHaveBeenCalledWith(
        input
      );
    });

    it("should handle errors during update", async () => {
      const mockError = new Error("Test error");

      // Mockeamos que el método update lanza un error
      (SubscriptionController.prototype.update as jest.Mock).mockRejectedValue(
        mockError
      );

      // Input simulado para la prueba
      const input: Input = {
        _id: "1",
        amount: 1000,
        status: "Opened",
        user: "1",
        fund: "1",
      };

      try {
        await subscriptionService.update(input);
      } catch (error) {
        // Comprobamos que el error fue lanzado
        expect(error).toBe(mockError);
      }

      // Comprobamos que el método update fue llamado correctamente
      expect(SubscriptionController.prototype.update).toHaveBeenCalledWith(
        input
      );
    });
  });
});
