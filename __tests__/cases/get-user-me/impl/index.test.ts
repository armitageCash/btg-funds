import { MeServiceImpl } from "../../../../src/cases/get-user-me/impl";
import UserController from "../../../../src/controllers/userController";
import { Input } from "../../../../src/cases/get-user-me/types";
import { User } from "../../../../src/domain/user";

// Mock del UserController
jest.mock("@/controllers/userController");

describe("MeServiceImpl", () => {
  let meService: MeServiceImpl;
  let userController: jest.Mocked<UserController>;

  beforeEach(() => {
    // Instanciamos el servicio
    meService = new MeServiceImpl();

    // Asignamos el mock del UserController
    userController = new UserController() as jest.Mocked<UserController>;

    // Aseguramos que el mock retorne una instancia de UserController
    (UserController as jest.Mock).mockReturnValue(userController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return user info successfully", async () => {
    const mockInput: Input = { _id: "12345" };
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

    // Mockeamos el método getUser para que devuelva los datos del usuario
    userController.getUser.mockResolvedValue(mockUser);

    // Llamamos al servicio
    const result = await meService.getUserInfo(mockInput);

    // Verificamos que se obtienen los datos correctamente
    expect(result).toEqual(mockUser);

    // Comprobamos que el controlador haya sido llamado con los parámetros correctos
    expect(userController.getUser).toHaveBeenCalledWith(mockInput);
  });

  it("should return null if no user data is found", async () => {
    const mockInput: Input = { _id: "12345" };

    // Mockeamos el método getUser para que devuelva null
    userController.getUser.mockResolvedValue(null);

    // Llamamos al servicio
    const result = await meService.getUserInfo(mockInput);

    // Verificamos que devuelve null cuando no se encuentran datos
    expect(result).toBeNull();

    // Verificamos que el controlador haya sido llamado con los parámetros correctos
    expect(userController.getUser).toHaveBeenCalledWith(mockInput);
  });

  it("should handle errors when fetching user data", async () => {
    const mockInput: Input = { _id: "12345" };
    const mockError = new Error("Error fetching user data");

    // Mockeamos el método getUser para que lance un error
    userController.getUser.mockRejectedValue(mockError);

    // Llamamos al servicio y verificamos el manejo de errores
    await expect(meService.getUserInfo(mockInput)).rejects.toThrow(
      "Error fetching user data"
    );

    // Verificamos que el controlador haya sido llamado con los parámetros correctos
    expect(userController.getUser).toHaveBeenCalledWith(mockInput);
  });
});
