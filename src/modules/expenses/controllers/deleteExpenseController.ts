import type { Request, Response } from "express";
import { ExpensesRepository } from "../repositories/PrismaExpenses.repository";
import { DeleteExpenseService } from "../services/deleteExpenseService";

export class DeleteExpenseController {
  async handle(request: Request, response: Response) {
    try {
      const { name, amount, description } = request.body;

      if (!name || !amount || !description) {
        return response.status(400).json({ error: "Invalid content." });
      }

      const expensesRepository = new ExpensesRepository();
      const service = new DeleteExpenseService(expensesRepository);

      await service.execute({ name, amount, description });

      return response.status(204);
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
