import { Expense } from "@modules/expenses/Expense";
import { InMemoryWalletsRepository } from "@modules/wallets/repositories/implementations/in-memory/InMemoryWallets.repository";
import { IExpensesRepository } from "../../IExpensesRepository";

export class InMemoryExpensesRepository implements IExpensesRepository {
  public expenses: Expense[];

  public constructor() {}

  // TODO: make walletExists validation
  public async create(expense: Expense): Promise<Expense> {
    this.expenses.push(expense);

    return expense;
  }

  public async findById(id: string): Promise<Expense> {
    const expense = this.expenses.find((expense) => expense.id === id);

    if (!expense) {
      throw new Error("Invalid id");
    }

    return expense;
  }

  public async findByName(name: string): Promise<Expense> {
    const expense = this.expenses.find(
      (expense) => expense.properties.name === name
    );

    if (!expense) {
      throw new Error("Invalid name");
    }

    return expense;
  }

  public async getWalletExpenses(walletId: string): Promise<Expense[]> {
    const expenses = this.expenses.filter(
      (expense) => expense.properties.walletId === walletId
    );

    return expenses;
  }

  public async updateAmount(
    expenseId: string,
    newAmount: number
  ): Promise<void> {
    let expense = await this.findById(expenseId);

    expense.properties.amount = newAmount;
  }

  public async deleteExpense(id: string): Promise<void> {
    const expenseIndex = this.expenses.findIndex(
      (expense) => expense.id === id
    );

    this.expenses.splice(expenseIndex, 1);
  }

  public async exists(name: string): Promise<boolean> {
    const expenseExists = this.expenses.some(
      (expense) => expense.properties.name === name
    );

    return expenseExists;
  }
}
