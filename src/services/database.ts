import mongoose, { Connection } from "mongoose";

class Database {
  private connection: Connection | null = null;

  constructor(private uri: string) {}

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri);
      this.connection = mongoose.connection;
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB");
    }
  }

  getConnection(): Connection | null {
    return this.connection;
  }
}

export default Database;
