import type { Request, Response } from "express";
import { WalletsRepository } from "../repositories/PrismaWallets.repository";
import { FindWalletByNameService } from "../services/findWalletByNameService";

export class FindWalletByNameController {
  async handle(request: Request, response: Response) {
    try {
      const { name } = request.params;

      if (!name) {
        return response.status(400).json({ error: "Invalid content" });
      }

      const walletsRepository = new WalletsRepository();
      const service = new FindWalletByNameService(walletsRepository);

      const result = await service.execute(name);

      return response.status(200).json({
        id: result.id,
        name: result.name,
        amount: result.amount,
        color: result.color,
      });
    } catch (error) {
      console.log(error);
      response.status(500).json(error);
    }
  }
}
