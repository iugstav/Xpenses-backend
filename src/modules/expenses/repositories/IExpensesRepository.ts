import { Expenses } from "@prisma/client";
import { IExpensesDTO } from "../expensesDTO";

export interface IExpensesRepository {
  create(expense: IExpensesDTO, walletId: string): Promise<Expenses>;
  findById(id: string): Promise<Expenses | null>;
  findByName(name: string): Promise<Expenses | null>;
  getWalletExpenses(walletId: string): Promise<Expenses[]>;
  exists(expense: IExpensesDTO): Promise<boolean>;
  updateAmount(expense: IExpensesDTO, newAmount: number): Promise<void>;
  deleteExpense(expense: IExpensesDTO): Promise<void>;

  checkIfAmountIsBiggerThanWallet(expense: IExpensesDTO): Promise<boolean>;
}
