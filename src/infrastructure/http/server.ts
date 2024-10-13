import "module-alias/register";
import restify from "restify";
import routes from "@/infrastructure/routes";
import DatabaseService from "@/services/database";
import Database from "@/services/database";

const server = restify.createServer({
  name: "btg-fund-api",
  version: "1.0.0",
});

routes(server);

server.use(restify.plugins.bodyParser());

server.get("/status-check", (req, res, next) => {
  res.send(200, { message: "¡Hola, mundo!" });
  return next();
});

server.listen(process.env.PORT || 3000, async () => {
  const connection = new Database(
    process.env.MONGO_URI?.toString() || "mongodb://testdb:27017/testdb"
  );
  await connection.connect();
  console.log("%s escuchando en %s", server.name, server.url);
});
