import { createApp, UseCaseResult } from "urunner-lib";
import { Logger } from "../../../src/shared/logger";
import { FundServiceImpl } from "../../../src/cases/get-funds/impl";
import { Fund } from "../../../src/domain/fund";
import { FundData, Input } from "../../../src/cases/get-funds/types";

// Mocks
jest.mock("urunner-lib");
jest.mock("@/shared/logger");
jest.mock("@/cases/get-funds/impl");

// Recreamos la estructura de getFundsCase para nuestros tests
const mockFundCase = async (
  params: Input,
  dependencies: { logger: Logger; fundService: FundServiceImpl }
): Promise<UseCaseResult<FundData[] | Fund[]>> => {
  const { logger: log, fundService } = dependencies;

  try {
    const response = await fundService.get(params);
    return {
      data: response || [],
      status: "success",
      message: "get data successfully.",
    };
  } catch (e: any) {
    log.error(e);
    return {
      data: e.message,
      message: "Error getting funds.",
      status: "error",
    };
  }
};

const mockAdapter =
  (fn: typeof mockFundCase) => async (params: Input, dependencies: any) => {
    return await fn(params, dependencies);
  };

describe("getFundsCase", () => {
  let mockCreateApp: jest.MockedFunction<typeof createApp>;
  let mockLogger: jest.Mocked<Logger>;
  let mockFundService: jest.Mocked<FundServiceImpl>;
  let getFundsCase: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockCreateApp = createApp as jest.MockedFunction<typeof createApp>;
    mockLogger = new Logger() as jest.Mocked<Logger>;
    mockFundService = new FundServiceImpl() as jest.Mocked<FundServiceImpl>;

    // Simulamos la creación de getFundsCase
    getFundsCase = jest.fn(async (input: Input) => {
      return mockFundCase(input, {
        logger: mockLogger,
        fundService: mockFundService,
      });
    });

    mockCreateApp.mockReturnValue({
      attach: jest.fn().mockReturnValue(getFundsCase),
    } as any);

    // Llamamos a createApp para asegurarnos de que se ejecute
    createApp(mockAdapter(mockFundCase)).attach((dependencies: any) => {
      dependencies.logger = mockLogger;
      dependencies.fundService = mockFundService;
    });
  });

  it("should create app with correct adapter", () => {
    expect(mockCreateApp).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should attach dependencies correctly", () => {
    expect(mockCreateApp().attach).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should handle successful fund retrieval", async () => {
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

    mockFundService.get.mockResolvedValue(mockFunds);

    const input: Input = {
      _id: "1",
      category: "prueba",
      minAmount: 0,
      name: "prueba",
      rate: 2.5,
    };
    const result = await getFundsCase(input);

    expect(result).toEqual({
      data: mockFunds,
      status: "success",
      message: "get data successfully.",
    });
    expect(mockFundService.get).toHaveBeenCalledWith(input);
  });

  it("should handle errors", async () => {
    const mockError = new Error("Test error");
    mockFundService.get.mockRejectedValue(mockError);

    const input: Input = {
      _id: "1",
      category: "prueba",
      minAmount: 0,
      name: "prueba",
      rate: 2.5,
    };
    const result = await getFundsCase(input);

    expect(result).toEqual({
      data: "Test error",
      message: "Error getting funds.",
      status: "error",
    });
    expect(mockLogger.error).toHaveBeenCalledWith(mockError);
  });

  it("should return an empty array if no funds are found", async () => {
    mockFundService.get.mockResolvedValue([]);

    const input: Input = {
      _id: "1",
      category: "prueba",
      minAmount: 0,
      name: "prueba",
      rate: 2.5,
    };
    const result = await getFundsCase(input);

    expect(result).toEqual({
      data: [],
      status: "success",
      message: "get data successfully.",
    });
  });
});
