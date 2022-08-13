import { Entity } from "@src/core/Entity";

type ExpenseProps = {
  name: string;
  amount: number;
  description: string;
  createdAt: Date;

  walletId: string;
};

export class Expense extends Entity<ExpenseProps> {
  private constructor(props: ExpenseProps, id?: string) {
    super(props, id);
  }

  static create(props: ExpenseProps, id?: string) {
    return new Expense(props, id);
  }
}
