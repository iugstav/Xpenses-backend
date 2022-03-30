import { IWallet } from "@modules/wallets/wallet";

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  name: string;
  createdAt?: Date;

  wallets?: IWallet[];
}
