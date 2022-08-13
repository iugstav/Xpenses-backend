import type { Request, Response } from "express";
import { WalletsRepository } from "../repositories/implementations/PrismaWallets.repository";
import { UpdateWalletNameService } from "../services/updateWalletNameService";

export class UpdateWalletNameController {
  async handle(request: Request, response: Response) {
    try {
      const { walletId, newName } = request.body;

      if (!walletId || !newName) {
        return response.status(400).json({ error: "Invalid content." });
      }

      const walletsRepository = new WalletsRepository();
      const service = new UpdateWalletNameService(walletsRepository);

      await service.execute({ walletId, newName });

      return response
        .status(204)
        .json({ message: "Wallet name successfully updated." });
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
