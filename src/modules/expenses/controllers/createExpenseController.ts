import type { Request, Response } from "express";
import { ExpensesRepository } from "../repositories/PrismaExpenses.repository";
import { CreateExpenseService } from "../services/createExpenseService";

export class CreateExpenseController {
  async handle(request: Request, response: Response) {
    try {
      const { name, amount, description, walletId } = request.body;

      if (!name || !amount || !description || !walletId) {
        return response.status(400).json({ error: "Invalid content." });
      }

      const expensesRepository = new ExpensesRepository();
      const service = new CreateExpenseService(expensesRepository);

      const result = await service.execute(
        { name, amount, description },
        walletId
      );

      return response.status(200).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
