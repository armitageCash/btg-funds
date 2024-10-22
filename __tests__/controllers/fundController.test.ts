import { Input } from "../../src/cases/get-funds/types";
import FundController from "../../src/controllers/fundController";
import { Fund } from "../../src/domain/fund";

class MockRepository {
  find = jest.fn();
  createOne = jest.fn();
}

jest.mock("../../src/repositories/fundRepository", () => {
  return {
    FundRepository: jest.fn().mockImplementation(() => {
      return new MockRepository();
    }),
  };
});

describe("FundController", () => {
  let fundController: FundController;
  let mockFundRepository: MockRepository;

  beforeEach(() => {
    fundController = new FundController();
    mockFundRepository =
      fundController.fundRepository as unknown as MockRepository;
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpia los mocks después de cada prueba
  });

  describe("getFunds", () => {
    it("should return a list of funds successfully", async () => {
      const mockFunds: Fund[] = [
        {
          _id: "1",
          name: "Fund 1",
          category: "Category 1",
          minAmount: 100,
          rate: 5,
        },
        {
          _id: "2",
          name: "Fund 2",
          category: "Category 2",
          minAmount: 200,
          rate: 7,
        },
      ];

      // Mockea el método find para que devuelva los fondos simulados
      mockFundRepository.find.mockResolvedValue(mockFunds);

      const funds = await fundController.getFunds();

      expect(funds).toEqual(mockFunds);
      expect(mockFundRepository.find).toHaveBeenCalledTimes(1); // Asegúrate de que se llame a find
    });

    it("should handle errors when getting funds", async () => {
      const mockError = new Error("Test error");
      mockFundRepository.find.mockRejectedValue(mockError); // Mockea un error

      const funds = await fundController.getFunds();

      expect(funds).toBeUndefined(); // Debe devolver undefined en caso de error
      expect(mockFundRepository.find).toHaveBeenCalledTimes(1); // Verifica que se haya llamado
    });
  });

  describe("getFund", () => {
    it("should return a fund by id successfully", async () => {
      const mockFund: Fund = {
        _id: "1",
        name: "Fund 1",
        category: "Category 1",
        minAmount: 100,
        rate: 5,
      };
      const input: Input = {
        _id: "1",
        name: "Fund 1",
        category: "Category 1",
        minAmount: 100,
        rate: 5,
      }; // Ajusta según tu definición de Input

      mockFundRepository.find.mockResolvedValue([mockFund]); // Mockea el retorno

      const fund = await fundController.getFund(input);

      expect(fund).toEqual([mockFund]); // Verifica que retorne el fondo correcto
      expect(mockFundRepository.find).toHaveBeenCalledWith({ id: input._id }); // Verifica que se llame con el id correcto
    });

    it("should handle errors when getting a fund", async () => {
      const mockError = new Error("Test error");
      const input: Input = {
        _id: "1",
        name: "Fund 1",
        category: "Category 1",
        minAmount: 100,
        rate: 5,
      };

      mockFundRepository.find.mockRejectedValue(mockError); // Mockea un error

      const fund = await fundController.getFund(input);

      expect(fund).toBeUndefined(); // Debe devolver undefined en caso de error
      expect(mockFundRepository.find).toHaveBeenCalledTimes(1); // Verifica que se haya llamado
    });
  });

  describe("add", () => {
    it("should add a new fund successfully", async () => {
      const newFund: Fund = {
        _id: "1",
        name: "Fund 1",
        category: "Category 1",
        minAmount: 100,
        rate: 5,
      };
      const input: Input = {
        _id: "1",
        name: "Fund 1",
        category: "Category 1",
        minAmount: 100,
        rate: 5,
      }; // Ajusta según tu definición de Input

      mockFundRepository.createOne.mockResolvedValue(newFund); // Mockea el retorno

      const fund = await fundController.add(input);

      expect(fund).toEqual(newFund); // Verifica que retorne el fondo creado
      expect(mockFundRepository.createOne).toHaveBeenCalledWith(input); // Verifica que se llame con el input correcto
    });

    it("should handle errors when adding a fund", async () => {
      const mockError = new Error("Test error");
      const input: Input = {
        _id: "1",
        name: "Fund 1",
        category: "Category 1",
        minAmount: 100,
        rate: 5,
      };

      mockFundRepository.createOne.mockRejectedValue(mockError); // Mockea un error

      const fund = await fundController.add(input);

      expect(fund).toBeUndefined(); // Debe devolver undefined en caso de error
      expect(mockFundRepository.createOne).toHaveBeenCalledTimes(1); // Verifica que se haya llamado
    });
  });
});
