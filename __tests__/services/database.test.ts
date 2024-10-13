import { MongoMemoryServer } from "mongodb-memory-server";
import Database from "../../src/services/database"; // Asegúrate de que la ruta sea correcta

describe("Database", () => {
  let mongoServer: MongoMemoryServer;
  let database: Database;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    database = new Database(mongoUri);
  });

  afterAll(async () => {
    await database.disconnect();
    await mongoServer.stop();
  });

  it("should connect to the database", async () => {
    await database.connect();
    const connection = database.getConnection();
    expect(connection).not.toBeNull();
    expect(connection?.readyState).toBe(1); // 1 means 'connected'
  });

  it("should disconnect from the database", async () => {
    await database.connect();
    await database.disconnect();
    const connection = database.getConnection();
    expect(connection?.readyState).toBe(0); // 0 means 'disconnected'
  });
});
