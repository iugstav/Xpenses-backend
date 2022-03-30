import { IExpensesRepository } from "../repositories/IExpensesRepository";

export class FindExpenseByNameService {
  constructor(private expensesRepository: IExpensesRepository) {}

  async execute(name: string) {
    if (name.trim().length < 4 || name.trim().length > 32) {
      throw new Error("invalid name");
    }

    const result = await this.expensesRepository.findByName(name);

    return result;
  }
}
