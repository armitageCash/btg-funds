import { Input } from "../../../../src/cases/get-me-txs/types";
import transactionController from "../../../../src/controllers/transactionController";
import { Transaction } from "../../../../src/domain/transaction";
import { TxsServiceImpl } from "../../../../src/cases/get-me-txs/impl";

jest.mock("@/controllers/transactionController");

describe("TxsServiceImpl", () => {
  let txsService: TxsServiceImpl;

  beforeEach(() => {
    txsService = new TxsServiceImpl();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpia los mocks después de cada test
  });

  describe("get method", () => {
    it("should return a list of transactions", async () => {
      const mockTransactions: Transaction[] = [
        {
          _id: "1",
          subscription: "sub_1",
          performance: 10,
          date: new Date(),
          status: "Opened",
          type: "IN",
        },
        {
          _id: "2",
          subscription: "sub_2",
          performance: 15,
          date: new Date(),
          status: "Closed",
          type: "OUT",
        },
      ];

      const mockInput: Input = {
        _id: "1",
      }; // Define tus parámetros de entrada según sea necesario

      // Mockeamos la respuesta del método getMeTxs
      (transactionController.prototype.getMeTxs as jest.Mock).mockResolvedValue(
        mockTransactions
      );

      // Llamamos al servicio
      const result = await txsService.get(mockInput);

      // Comprobamos que devuelve las transacciones esperadas
      expect(result).toEqual(mockTransactions);

      // Comprobamos que el método getMeTxs fue llamado correctamente
      expect(transactionController.prototype.getMeTxs).toHaveBeenCalledWith(
        mockInput
      );
    });

    it("should return undefined if no transactions are found", async () => {
      const mockInput: Input = {
        _id: "1",
      };

      // Mockeamos la respuesta para devolver undefined
      (transactionController.prototype.getMeTxs as jest.Mock).mockResolvedValue(
        undefined
      );

      // Llamamos al servicio
      const result = await txsService.get(mockInput);

      // Comprobamos que devuelve undefined
      expect(result).toBeUndefined();
    });
  });
});
