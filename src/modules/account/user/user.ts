import { Wallet } from "@modules/wallets/Wallet";

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  name: string;
  createdAt?: Date;

  wallets?: Wallet[];
}
