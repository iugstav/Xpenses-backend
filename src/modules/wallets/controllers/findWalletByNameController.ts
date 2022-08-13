import type { Request, Response } from "express";
import { WalletsRepository } from "../repositories/implementations/PrismaWallets.repository";
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
        name: result.properties.name,
        amount: result.properties.amount,
        color: result.properties.color,
      });
    } catch (error) {
      console.log(error);
      response.status(500).json(error);
    }
  }
}
