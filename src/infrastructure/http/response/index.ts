import { Request, Response, Next } from "restify";
import { UseCaseResult } from "urunner-lib";

export function createHttpResponse<T>(
  req: Request,
  res: Response,
  next: Next,
  result: UseCaseResult<T>
): void {
  if (result.status === "error") {
    res.send(400, result);
  } else if (result.status === "success") {
    res.send(200, result);
  }

  return next();
}
