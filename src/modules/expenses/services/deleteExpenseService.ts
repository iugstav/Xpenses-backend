import { IExpensesDTO } from "../expensesDTO";
import { IExpensesRepository } from "../repositories/IExpensesRepository";

export class DeleteExpenseService {
  constructor(private expensesRepository: IExpensesRepository) {}

  async execute(expense: IExpensesDTO) {
    if (expense.name.trim().length < 4 || expense.name.trim().length > 32) {
      throw new Error("invalid expense name");
    }

    await this.expensesRepository.deleteExpense(expense);

    return;
  }
}
