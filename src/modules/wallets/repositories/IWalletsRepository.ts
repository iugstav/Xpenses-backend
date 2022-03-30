import { Wallet } from "@prisma/client";
import { IWalletDTO } from "../walletDTO";

export interface IWalletsRepository {
  create(wallet: IWalletDTO, email: string): Promise<Wallet>;
  findByName(name: string): Promise<Wallet | null>;
  findById(walletId: string): Promise<Wallet | null>;
  getAll(userId: string): Promise<Wallet[]>;
  exists(wallet: IWalletDTO): Promise<boolean>;
  updateName(wallet: IWalletDTO, newName: string): Promise<void>;
  deleteWallet(wallet: IWalletDTO): Promise<void>;
}
