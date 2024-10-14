import getFundCase from "@/cases/get-funds";
import getMeTxs from "@/cases/get-me-txs";
import getUserMe from "@/cases/get-user-me";
import postSubscription from "@/cases/post-subscription-fund";
import putSubscription from "@/cases/put-subscription-fund";
import { Server } from "restify";
import { createHttpResponse } from "../response";

export default (server: Server) => {
  server.get("/api/funds", (req, res, next) => {
    (async () => {
      const data = await getFundCase.run();
      return createHttpResponse(req, res, next, data);
    })();
  });

  server.get("/api/me/:id", (req, res, next) => {
    (async () => {
      const data = await getUserMe.run({
        _id: req.params.id,
      });
      return createHttpResponse(req, res, next, data);
    })();
  });

  server.get("/api/txs/:me", (req, res, next) => {
    (async () => {
      const data = await getMeTxs.run({
        _id: req.params.id,
      });
      return createHttpResponse(req, res, next, data);
    })();
  });

  server.post("/api/subscription", (req, res, next) => {
    (async () => {
      const data = await postSubscription.run(req.body);
      return createHttpResponse(req, res, next, data);
    })();
  });

  server.put("/api/subscription", (req, res, next) => {
    (async () => {
      const data = await putSubscription.run(req.body);
      return createHttpResponse(req, res, next, data);
    })();
  });
};
