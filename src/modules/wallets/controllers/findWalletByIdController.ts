import type { Request, Response } from "express";
import { WalletsRepository } from "../repositories/implementations/PrismaWallets.repository";
import { FindWalletByIdService } from "../services/findWalletByIdService";

export class FindWalletByIdController {
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({ error: "Invalid content" });
      }

      const walletsRepository = new WalletsRepository();
      const service = new FindWalletByIdService(walletsRepository);

      const result = await service.execute(id);

      return response.status(200).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
