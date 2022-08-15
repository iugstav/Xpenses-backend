import { IWalletsRepository } from "@modules/wallets/repositories/IWalletsRepository";
import { randomUUID } from "crypto";

import { Expense } from "../Expense";
import { IExpensesRepository } from "../repositories/IExpensesRepository";

type CreateExpenseServiceRequest = {
  name: string;
  amount: number;
  description: string;
  walletId: string;
  createdAt: Date;
};

export class CreateExpenseService {
  constructor(
    private expensesRepository: IExpensesRepository,
    private walletsRepository: IWalletsRepository
  ) {}

  async execute(expense: CreateExpenseServiceRequest) {
    if (expense.name.trim().length < 4 || expense.name.trim().length > 32) {
      throw new Error("invalid expense name");
    }
    if (expense.walletId.trim().length < 30) {
      throw new Error("invalid wallet id");
    }

    const expenseAlreadyExists = await this.expensesRepository.exists(
      expense.name
    );

    if (expenseAlreadyExists) {
      throw new Error("Expense already created");
    }

    const expenseWallet = await this.walletsRepository.findById(
      expense.walletId
    );

    if (expense.amount > expenseWallet.properties.amount) {
      throw new Error("Expense amount cannot be bigger than wallet amount");
    }

    const expenseId = randomUUID();

    const newExpense = Expense.create(
      {
        name: expense.name,
        amount: expense.amount,
        description: expense.description,
        walletId: expense.walletId,
        createdAt: expense.createdAt,
      },
      expenseId
    );

    const result = await this.expensesRepository.create(newExpense);

    return result;
  }
}
