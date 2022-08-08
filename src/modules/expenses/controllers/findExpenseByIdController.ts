import type { Request, Response } from "express";
import { ExpensesRepository } from "../repositories/implementations/PrismaExpenses.repository";
import { FindExpenseByIdService } from "../services/findExpenseByIdService";

export class FindExpenseByIdController {
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({ error: "invalid id" });
      }

      const expensesRepository = new ExpensesRepository();
      const service = new FindExpenseByIdService(expensesRepository);

      const result = await service.execute(id);

      return response.status(200).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
