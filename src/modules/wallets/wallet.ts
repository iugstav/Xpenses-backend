import { Expense } from "@modules/expenses/Expense";

export interface IWallet {
  id: string;
  name: string;
  amount: number;
  color: string;
  createdAt: string;

  ownerId: string;
  expenses: Expense[];
}
