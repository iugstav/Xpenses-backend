import { Wallet } from "@modules/wallets/Wallet";
import { Entity } from "@src/core/Entity";

type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt: Date;

  wallets: Wallet[];
};

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  public static create(props: UserProps, id?: string) {
    return new User(props, id);
  }
}
