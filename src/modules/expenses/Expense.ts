import { Entity } from "@src/core/Entity";

type ExpensesProps = {
  name: string;
  amount: number;
  description: string;
  createdAt: Date;

  walletId: string;
};

export class Expense extends Entity<ExpensesProps> {
  private constructor(props: ExpensesProps, id?: string) {
    super(props, id);
  }

  static create(props: ExpensesProps, id?: string) {
    return new Expense(props, id);
  }
}
