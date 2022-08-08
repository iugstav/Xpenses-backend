import type { Request, Response } from "express";
import { ExpensesRepository } from "../repositories/implementations/PrismaExpenses.repository";
import { CreateExpenseService } from "../services/createExpenseService";

export class CreateExpenseController {
  async handle(request: Request, response: Response) {
    try {
      const { name, amount, description, walletId, createdAt } = request.body;

      if (!name || !amount || !description || !walletId) {
        return response.status(400).json({
          error: "Content does not match the necessary to create an expense.",
        });
      }

      const expensesRepository = new ExpensesRepository();
      const service = new CreateExpenseService(expensesRepository);

      const result = await service.execute({
        name,
        amount,
        description,
        walletId,
        createdAt,
      });

      return response.status(200).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
