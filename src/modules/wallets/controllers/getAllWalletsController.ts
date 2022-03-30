import type { Request, Response } from "express";
import { WalletsRepository } from "../repositories/PrismaWallets.repository";
import { GetAllWalletsService } from "../services/getAllWalletsService";

export class GetAllWalletsController {
  async handle(request: Request, response: Response) {
    try {
      const { userId } = request.params;

      if (!userId) {
        return response.status(400).json({ error: "Invalid content." });
      }

      const walletsRepository = new WalletsRepository();
      const service = new GetAllWalletsService(walletsRepository);

      const result = await service.execute(userId);

      return response.status(200).json({ result });
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
