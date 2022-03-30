import { RegisterDto } from "@modules/account/auth/dto/register.dto";
import { BCryptHash } from "@modules/account/auth/hash";
import type { Request, Response } from "express";
import { UsersRepository } from "../repositories/PrismaUsers.repository";
import { CreateUserService } from "../services/createUserService";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;
      const data = new RegisterDto(name, email, password);

      const usersRepository = new UsersRepository();
      const bCryptHasher = new BCryptHash();

      const service = new CreateUserService(usersRepository, bCryptHasher);

      const user = await service.execute({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      return response.json({
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
