import type { Request, Response } from "express";
import { WalletsRepository } from "../repositories/PrismaWallets.repository";
import { CreateWalletService } from "../services/createWalletService";

export class CreateWalletController {
  async handle(request: Request, response: Response) {
    try {
      const { name, amount, color, email } = request.body;

      if (!name || !amount || !color) {
        return response.status(400).json({ error: "Invalid content." });
      }

      const walletsRepository = new WalletsRepository();
      const service = new CreateWalletService(walletsRepository);

      const result = await service.execute({ name, amount, color }, email);

      return response.status(200).json({
        name: result.name,
        amount: result.amount,
        color: result.color,
      });
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
