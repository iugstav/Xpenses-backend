import type { Request, Response } from "express";
import { ExpensesRepository } from "../repositories/implementations/PrismaExpenses.repository";
import { UpdateExpenseAmountService } from "../services/updateExpenseAmountService";

export class UpdateExpenseAmountController {
  async handle(request: Request, response: Response) {
    try {
      const { expenseId, newAmount } = request.body;

      if (!expenseId || !newAmount) {
        return response
          .status(400)
          .json({
            error: "Content does not match the necessary to update an expense.",
          });
      }

      const expensesRepository = new ExpensesRepository();
      const service = new UpdateExpenseAmountService(expensesRepository);

      await service.execute({ expenseId, newAmount });

      return response.status(204);
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
