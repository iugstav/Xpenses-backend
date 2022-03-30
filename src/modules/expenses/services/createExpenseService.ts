import { IExpensesDTO } from "../expensesDTO";
import { IExpensesRepository } from "../repositories/IExpensesRepository";

export class CreateExpenseService {
  constructor(private expensesRepository: IExpensesRepository) {}

  async execute(expense: IExpensesDTO, walletId: string) {
    if (expense.name.trim().length < 4 || expense.name.trim().length > 32) {
      throw new Error("invalid expense name");
    }
    if (walletId.trim().length < 30) {
      throw new Error("invalid wallet id");
    }

    const expenseAlreadyExists = await this.expensesRepository.exists(expense);

    if (expenseAlreadyExists) {
      throw new Error("Expense already created");
    }

    const isExpenseAmountBiggerThanWallet =
      await this.expensesRepository.checkIfAmountIsBiggerThanWallet(expense);

    if (isExpenseAmountBiggerThanWallet) {
      throw new Error("Expense amount cannot be bigger than wallet amount");
    }

    const result = await this.expensesRepository.create(expense, walletId);

    return result;
  }
}
