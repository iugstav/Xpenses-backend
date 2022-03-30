import type { Request, Response } from "express";
import { WalletsRepository } from "../repositories/PrismaWallets.repository";
import { UpdateWalletNameService } from "../services/updateWalletNameService";

export class UpdateWalletNameController {
  async handle(request: Request, response: Response) {
    try {
      const { name, amount, color, newName } = request.body;

      if (!name || !amount || !color || !newName) {
        return response.status(400).json({ error: "Invalid content." });
      }

      const walletsRepository = new WalletsRepository();
      const service = new UpdateWalletNameService(walletsRepository);

      await service.execute({ name, amount, color }, newName);

      return response.status(204);
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
