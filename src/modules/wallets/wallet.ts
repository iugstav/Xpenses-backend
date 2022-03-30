import { IExpenses } from "@modules/expenses/expenses";

export interface IWallet {
  id: string;
  name: string;
  amount: number;
  color: string;
  createdAt: string;

  ownerId: string;
  expenses: IExpenses[];
}
