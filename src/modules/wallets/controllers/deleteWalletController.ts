import type { Request, Response } from "express";
import { WalletsRepository } from "../repositories/implementations/PrismaWallets.repository";
import { DeleteWalletService } from "../services/deleteWalletService";

export class DeleteWalletController {
  async handle(request: Request, response: Response) {
    try {
      const { walletId } = request.body;

      if (!walletId) {
        return response.status(400).json({ error: "Invalid content." });
      }

      const walletsRepository = new WalletsRepository();
      const service = new DeleteWalletService(walletsRepository);

      await service.execute(walletId);

      return response
        .status(204)
        .json({ message: "successfully deleted wallet." });
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
