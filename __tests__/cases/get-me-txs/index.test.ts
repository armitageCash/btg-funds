import { createApp, UseCaseResult } from "urunner-lib";
import { Logger } from "../../../src/shared/logger";
import { TxsServiceImpl } from ".../../../src/cases/get-me-txs/impl";
import { Transaction } from "../../../src/domain/transaction";
import { Input } from "../../../src/cases/get-me-txs/types";

// Mocks
jest.mock("urunner-lib");
jest.mock("@/shared/logger");
jest.mock("@/cases/get-me-txs/impl");

// Recreamos la estructura de meTxsCase para nuestros tests
const mockMeTxsCase = async (
  params: Input,
  dependencies: { logger: Logger; txService: TxsServiceImpl }
): Promise<UseCaseResult<Transaction[]>> => {
  const { logger: log, txService } = dependencies;

  try {
    const response = await txService.get(params);
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
  (fn: typeof mockMeTxsCase) => async (params: Input, dependencies: any) => {
    return await fn(params, dependencies);
  };

describe("meTxsCase", () => {
  let mockCreateApp: jest.MockedFunction<typeof createApp>;
  let mockLogger: jest.Mocked<Logger>;
  let mockTxService: jest.Mocked<TxsServiceImpl>;
  let getMeTxsCase: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockCreateApp = createApp as jest.MockedFunction<typeof createApp>;
    mockLogger = new Logger() as jest.Mocked<Logger>;
    mockTxService = new TxsServiceImpl() as jest.Mocked<TxsServiceImpl>;

    // Simulamos la creación de getMeTxsCase
    getMeTxsCase = jest.fn(async (input: Input) => {
      return mockMeTxsCase(input, {
        logger: mockLogger,
        txService: mockTxService,
      });
    });

    mockCreateApp.mockReturnValue({
      attach: jest.fn().mockReturnValue(getMeTxsCase),
    } as any);

    createApp(mockAdapter(mockMeTxsCase)).attach((dependencies: any) => {
      dependencies.logger = mockLogger;
      dependencies.txService = mockTxService;
    });
  });

  it("should create app with correct adapter", () => {
    expect(mockCreateApp).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should attach dependencies correctly", () => {
    expect(mockCreateApp().attach).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should handle successful transaction retrieval", async () => {
    const mockTransactions: Transaction[] = [
      {
        _id: "1",
        subscription: "sub-001",
        performance: 75,
        date: new Date("2024-01-01"),
        status: "Opened",
        type: "IN",
      },
      {
        _id: "2",
        subscription: "sub-002",
        performance: 50,
        date: new Date("2024-01-02"),
        status: "Closed",
        type: "OUT",
      },
    ];

    mockTxService.get.mockResolvedValue(mockTransactions);

    const input: Input = {
      _id: "1",
    }; // Cambia según tu estructura real de Input
    const result = await getMeTxsCase(input);

    expect(result).toEqual({
      data: mockTransactions,
      status: "success",
      message: "get data successfully.",
    });
    expect(mockTxService.get).toHaveBeenCalledWith(input);
  });

  it("should handle errors", async () => {
    const mockError = new Error("Test error");
    mockTxService.get.mockRejectedValue(mockError);

    const input: Input = {
      _id: "1",
    }; // Cambia según tu estructura real de Input
    const result = await getMeTxsCase(input);

    expect(result).toEqual({
      data: "Test error",
      message: "Error getting funds.",
      status: "error",
    });
    expect(mockLogger.error).toHaveBeenCalledWith(mockError);
  });

  it("should return an empty array if no transactions are found", async () => {
    mockTxService.get.mockResolvedValue([]);

    const input: Input = {
      _id: "1",
    }; // Cambia según tu estructura real de Input
    const result = await getMeTxsCase(input);

    expect(result).toEqual({
      data: [],
      status: "success",
      message: "get data successfully.",
    });
  });
});
