import { IExpensesDTO } from "../expensesDTO";
import { IExpensesRepository } from "../repositories/IExpensesRepository";

export class UpdateExpenseAmountService {
  constructor(private expensesRepository: IExpensesRepository) {}

  async execute(expense: IExpensesDTO, newAmount: number) {
    if (expense.name.trim().length < 4 || expense.name.trim().length > 32) {
      throw new Error("invalid expense name");
    }
    if (newAmount <= 0) {
      throw new Error("new amount cannot be equal or lower than 0");
    }

    const isExpenseAmountBiggerThanWallet =
      await this.expensesRepository.checkIfAmountIsBiggerThanWallet(expense);

    if (isExpenseAmountBiggerThanWallet) {
      throw new Error("Expense amount cannot be bigger than wallet amount");
    }

    const result = await this.expensesRepository.updateAmount(
      expense,
      newAmount
    );

    return;
  }
}
