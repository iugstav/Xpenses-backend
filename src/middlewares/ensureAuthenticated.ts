import type { Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import { verify } from "jsonwebtoken";

interface IPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const auth = request.headers.authorization;

  if (!auth) {
    return response.status(401).json(new Error("Invalid token"));
  }

  const [, token] = auth.split(" ");

  try {
    const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET as string);

    const { sub } = decoded as IPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    return response.status(401).json(new Error("Invalid token"));
  }
}
