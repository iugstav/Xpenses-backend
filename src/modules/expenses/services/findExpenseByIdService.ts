import { IExpensesRepository } from "../repositories/IExpensesRepository";

export class FindExpenseByIdService {
  constructor(private expensesRepository: IExpensesRepository) {}

  async execute(id: string) {
    if (id.trim().length < 30) {
      throw new Error("invalid id");
    }

    const result = await this.expensesRepository.findById(id);

    if (!result) {
      throw new Error("Invalid id");
    }

    return result;
  }
}
