import { BCryptHash } from "@modules/account/auth/hash";
import type { Request, Response } from "express";
import { UsersRepository } from "../repositories/PrismaUsers.repository";
import { AuthenticateUserService } from "../services/authenticateUserService";

export class AuthenticationController {
  async handle(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const usersRepository = new UsersRepository();
      const bCryptHasher = new BCryptHash();
      const service = new AuthenticateUserService(
        usersRepository,
        bCryptHasher
      );

      const { user, token } = await service.execute(email, password);

      return response.status(200).json({
        user: {
          email: user.email,
          name: user.name,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
