import { Wallet } from "../Wallet";
import { IWalletDTO } from "../walletDTO";

export interface IWalletsRepository {
  create(wallet: Wallet): Promise<Wallet>;
  findByName(name: string): Promise<Wallet>;
  findById(walletId: string): Promise<Wallet>;
  getAll(userId: string): Promise<Wallet[]>;
  exists(id: string): Promise<boolean>;
  updateName(walletId: string, newName: string): Promise<void>;
  deleteWallet(id: string): Promise<void>;
}
