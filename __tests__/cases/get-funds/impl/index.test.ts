import { FundServiceImpl } from "../../../../src/cases/get-funds/impl";
import FundController from "../../../../src/controllers/fundController";
import { Fund } from "../../../../src/domain/fund";
import { RootFilterQuery } from "mongoose";

// Mock del controlador para evitar interacciones con la base de datos real
jest.mock("@/controllers/fundController");

describe("FundServiceImpl", () => {
  let fundService: FundServiceImpl;

  beforeEach(() => {
    fundService = new FundServiceImpl();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpia los mocks después de cada test
  });

  describe("get method", () => {
    it("should return a list of funds", async () => {
      const mockFunds: Fund[] = [
        {
          _id: "1", // Asegúrate de que esto sea de tipo 'string'
          name: "Fund 1",
          category: "Category 1", // Agrega un valor válido para 'category'
          minAmount: 1000,
          rate: 0,
        },
        {
          _id: "1", // Asegúrate de que esto sea de tipo 'string'
          name: "Fund 1",
          category: "Category 1", // Agrega un valor válido para 'category'
          minAmount: 1000,
          rate: 0,
        },
      ];

      // Mockeamos la respuesta del método getFunds
      (FundController.prototype.getFunds as jest.Mock).mockResolvedValue(
        mockFunds
      );

      // Llamamos al servicio
      const result = await fundService.get();

      // Comprobamos que devuelve los fondos esperados
      expect(result).toEqual(mockFunds);

      // Comprobamos que el método getFunds fue llamado correctamente
      expect(FundController.prototype.getFunds).toHaveBeenCalledWith(undefined);
    });

    it("should call getFunds with a filter query", async () => {
      // Filtro de prueba
      const mockQuery: RootFilterQuery<Fund> = { name: "Fund 1" };

      // Datos simulados de retorno
      const mockFunds: Fund[] = [
        {
          _id: "1",
          name: "Fund 1",
          category: "Category 1", // Asegúrate de que esto esté definido
          minAmount: 1000,
          rate: 0,
        },
      ];

      // Mockeamos la respuesta del método getFunds
      (FundController.prototype.getFunds as jest.Mock).mockResolvedValue(
        mockFunds
      );

      // Llamamos al servicio con un filtro
      const result = await fundService.get(mockQuery);

      // Comprobamos que devuelve el fondo esperado
      expect(result).toEqual(mockFunds);

      // Comprobamos que getFunds fue llamado con el query correcto
      expect(FundController.prototype.getFunds).toHaveBeenCalledWith(mockQuery);
    });

    it("should return undefined if no funds are found", async () => {
      // Mockeamos la respuesta para devolver undefined
      (FundController.prototype.getFunds as jest.Mock).mockResolvedValue(
        undefined
      );

      // Llamamos al servicio
      const result = await fundService.get();

      // Comprobamos que devuelve undefined
      expect(result).toBeUndefined();
    });
  });
});
