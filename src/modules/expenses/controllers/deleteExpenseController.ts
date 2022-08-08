import type { Request, Response } from "express";
import { ExpensesRepository } from "../repositories/implementations/PrismaExpenses.repository";
import { DeleteExpenseService } from "../services/deleteExpenseService";

export class DeleteExpenseController {
  async handle(request: Request, response: Response) {
    try {
      const { expenseId } = request.body;

      if (!expenseId) {
        return response
          .status(400)
          .json({
            error: "Content does not match the necessary to delete an expense.",
          });
      }

      const expensesRepository = new ExpensesRepository();
      const service = new DeleteExpenseService(expensesRepository);

      await service.execute(expenseId);

      return response.status(204);
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
