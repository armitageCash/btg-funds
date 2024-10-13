import { Request, Response, Next } from "restify";
import { UserSchema } from "@/infrastructure/http/middlewares/validateRequest/schemas/user";

export const validateRequestBody = (
  req: Request,
  res: Response,
  next: Next
) => {
  const { error } = UserSchema.validate(req.body);

  if (error) {
    return res.send(400, { error: error.details[0].message });
  }

  return next();
};
