import type { Request, Response } from "express";
import { ExpensesRepository } from "../repositories/PrismaExpenses.repository";
import { GetWalletExpensesService } from "../services/getWalletExpensesService";

export class GetWalletExpensesController {
  async handle(request: Request, response: Response) {
    try {
      const { walletId } = request.params;

      if (walletId.trim().length < 30) {
        return response.status(400).json({ error: "invalid wallet id" });
      }

      const expensesRepository = new ExpensesRepository();
      const service = new GetWalletExpensesService(expensesRepository);

      const result = await service.execute(walletId);

      return response.status(200).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
