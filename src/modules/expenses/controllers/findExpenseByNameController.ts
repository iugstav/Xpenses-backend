import type { Request, Response } from "express";
import { ExpensesRepository } from "../repositories/implementations/PrismaExpenses.repository";
import { FindExpenseByNameService } from "../services/findExpenseByNameService";

export class FindExpenseByNameController {
  async handle(request: Request, response: Response) {
    try {
      const { name } = request.params;

      if (!name || name.trim().length < 4 || name.trim().length > 32) {
        return response.status(400).json({ error: "invalid name" });
      }

      const expensesRepository = new ExpensesRepository();
      const service = new FindExpenseByNameService(expensesRepository);

      const result = await service.execute(name);

      return response.status(200).json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
    }
  }
}
