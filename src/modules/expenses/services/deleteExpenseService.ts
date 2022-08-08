import { IExpensesRepository } from "../repositories/IExpensesRepository";

type DeleteExpenseServiceRequest = {
  id: string;
};

export class DeleteExpenseService {
  constructor(private expensesRepository: IExpensesRepository) {}

  async execute({ id }: DeleteExpenseServiceRequest) {
    if (!id) {
      throw new Error("parameter not found.");
    }

    await this.expensesRepository.deleteExpense(id);

    return;
  }
}
