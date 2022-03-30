import { IExpensesRepository } from "../repositories/IExpensesRepository";

export class GetWalletExpensesService {
  constructor(private expensesRepository: IExpensesRepository) {}

  async execute(walletId: string) {
    if (walletId.trim().length < 30) {
      throw new Error("invalid wallet id");
    }

    const result = await this.expensesRepository.getWalletExpenses(walletId);

    return result;
  }
}
