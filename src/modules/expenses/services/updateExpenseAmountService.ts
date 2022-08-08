import { IExpensesRepository } from "../repositories/IExpensesRepository";

type UpdateExpenseAmountServiceRequest = {
  expenseId: string;
  newAmount: number;
};

export class UpdateExpenseAmountService {
  constructor(private expensesRepository: IExpensesRepository) {}

  async execute({ expenseId, newAmount }: UpdateExpenseAmountServiceRequest) {
    if (newAmount <= 0) {
      throw new Error("new amount cannot be equal or lower than 0");
    }

    const expense = await this.expensesRepository.findById(expenseId);

    const isExpenseAmountBiggerThanWallet =
      await this.expensesRepository.checkIfAmountIsBiggerThanWallet(
        expense.properties.name
      );

    if (isExpenseAmountBiggerThanWallet) {
      throw new Error("Expense amount cannot be bigger than wallet amount");
    }

    await this.expensesRepository.updateAmount(expense.id, newAmount);
  }
}
