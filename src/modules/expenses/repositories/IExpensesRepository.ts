import { Expense } from "../Expense";

export interface IExpensesRepository {
  create(expense: Expense): Promise<Expense>;
  findById(id: string): Promise<Expense>;
  findByName(name: string): Promise<Expense>;
  getWalletExpenses(walletId: string): Promise<Expense[]>;
  exists(name: string): Promise<boolean>;
  updateAmount(expenseId: string, newAmount: number): Promise<void>;
  deleteExpense(id: string): Promise<void>;
}
