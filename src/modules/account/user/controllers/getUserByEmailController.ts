import type { Request, Response } from "express";
import { UsersRepository } from "../repositories/implementations/PrismaUsers.repository";
import { GetUserByEmailService } from "../services/getUserByEmailService";

export class GetUserByEmailController {
  async handle(request: Request, response: Response) {
    try {
      const { email } = request.params;

      const usersRepository = new UsersRepository();
      const service = new GetUserByEmailService(usersRepository);

      const result = await service.execute(email);

      return response.status(200).json({
        id: result.id,
        name: result.name,
        email: result.email,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
