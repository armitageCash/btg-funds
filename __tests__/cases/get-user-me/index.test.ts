import { MeUserCase } from "../../../src/cases/get-user-me";
import { Logger } from "../../../src/shared/logger";
import { MeServiceImpl } from "../../../src/cases/get-user-me/impl";
import { User } from "../../../src/domain/user";
import { Input } from "../../../src/cases/get-user-me/types";

// Mock de MeServiceImpl y Logger
jest.mock("@/cases/get-user-me/impl");
jest.mock("@/shared/logger");

describe("MeUserCase", () => {
  let meService: MeServiceImpl;
  let logger: Logger;
  let dependencies: { logger: Logger; meService: MeServiceImpl };

  beforeEach(() => {
    meService = new MeServiceImpl();
    logger = new Logger();
    dependencies = { logger, meService };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return user data successfully", async () => {
    const mockInput: Input = {
      _id: "1",
    };
    const mockUser: User = {
      _id: "12345",
      email: "john.doe@example.com",
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      wallet: {
        _id: "1",
        balance: 50000,
      },
    };

    // Mockeamos el servicio para que devuelva un usuario
    (meService.getUserInfo as jest.Mock).mockResolvedValue(mockUser);

    // Ejecutamos el caso de uso
    const result = await MeUserCase(mockInput, dependencies);

    // Comprobamos que devuelve los datos del usuario correctamente
    expect(result).toEqual({
      data: mockUser,
      status: "success",
      message: "get me data succesfully.",
    });

    // Verificamos que se haya llamado el servicio con los parámetros correctos
    expect(meService.getUserInfo).toHaveBeenCalledWith(mockInput);
  });

  it("should handle errors gracefully", async () => {
    const mockInput: Input = { _id: "1" };
    const mockError = new Error("Error fetching user data");

    // Mockeamos el servicio para que lance un error
    (meService.getUserInfo as jest.Mock).mockRejectedValue(mockError);

    // Ejecutamos el caso de uso
    const result = await MeUserCase(mockInput, dependencies);

    // Comprobamos que devuelve el error correctamente
    expect(result).toEqual({
      data: mockError.message,
      status: "error",
      message: "Error getting me user .",
    });

    // Verificamos que se haya llamado el servicio
    expect(meService.getUserInfo).toHaveBeenCalledWith(mockInput);

    // Comprobamos que el logger haya registrado el error
    expect(logger.error).toHaveBeenCalledWith(mockError);
  });

  it("should return null if no user data is found", async () => {
    const mockInput: Input = { _id: "1" };

    // Mockeamos el servicio para que devuelva null
    (meService.getUserInfo as jest.Mock).mockResolvedValue(null);

    // Ejecutamos el caso de uso
    const result = await MeUserCase(mockInput, dependencies);

    // Comprobamos que devuelve null cuando no se encuentra un usuario
    expect(result).toEqual({
      data: null,
      status: "success",
      message: "get me data succesfully.",
    });

    // Verificamos que se haya llamado el servicio con los parámetros correctos
    expect(meService.getUserInfo).toHaveBeenCalledWith(mockInput);
  });
});
