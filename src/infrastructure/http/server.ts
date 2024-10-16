import "module-alias/register";
import restify from "restify";
import routes from "@/infrastructure/http/routes";
import Database from "@/services/database";
import corsMiddleware from "restify-cors-middleware2";

const server = restify.createServer({
  name: "btg-fund-api",
  version: "1.0.0",
});

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ["*"],
  allowHeaders: ["API-Token"],
  exposeHeaders: ["API-Token-Expiry"],
});

server.pre(cors.preflight);
server.use(cors.actual);

routes(server);

server.use(restify.plugins.bodyParser());

server.get("/", (req, res, next) => {
  res.send(200, { message: "¡Hola, mundo!" });
  return next();
});

server.get("/status-check", (req, res, next) => {
  res.send(200, { message: "¡Hola, mundo!" });
  return next();
});

server.listen(process.env.PORT || 3000, "0.0.0.0", async () => {
  const connection = new Database(
    process.env.MONGO_URI?.toString() || "mongodb://testdb:27017/testdb"
  );
  await connection.connect();

  console.log("ENV", process.env);
  console.log("%s escuchando en %s", server.name, server.url);
});
