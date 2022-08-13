import { Expense } from "@modules/expenses/Expense";
import { Entity } from "@src/core/Entity";

type WalletProps = {
  name: string;
  amount: number;
  color: string;
  createdAt: Date;

  userId: string;
  expenses: Expense[];
};

export class Wallet extends Entity<WalletProps> {
  private constructor(props: WalletProps, id?: string) {
    super(props, id);
  }

  static create(props: WalletProps, id?: string) {
    return new Wallet(props, id);
  }
}
