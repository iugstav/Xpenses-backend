import type { Request, Response } from "express";
import { ExpensesRepository } from "../repositories/PrismaExpenses.repository";
import { UpdateExpenseAmountService } from "../services/updateExpenseAmountService";

export class UpdateExpenseAmountController {
  async handle(request: Request, response: Response) {
    try {
      const { name, amount, description, newAmount } = request.body;

      if (!name || !amount || !description) {
        return response.status(400).json({ error: "Invalid content." });
      }

      if (name.trim().length < 4 || name.trim().length > 32) {
        return response.status(400).json({ error: "Invalid name." });
      }

      if (description.trim().length < 8 || description.trim().length > 255) {
        return response.status(400).json({ error: "Invalid description." });
      }

      const expensesRepository = new ExpensesRepository();
      const service = new UpdateExpenseAmountService(expensesRepository);

      await service.execute({ name, amount, description }, newAmount);

      return response.status(204);
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
