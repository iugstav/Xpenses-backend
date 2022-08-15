import { Wallet } from "@modules/wallets/Wallet";
import { IWalletsRepository } from "../../IWalletsRepository";

export class InMemoryWalletsRepository implements IWalletsRepository {
  public wallets: Wallet[];

  public constructor() {}

  public async create(wallet: Wallet): Promise<Wallet> {
    this.wallets.push(wallet);

    return wallet;
  }

  public async findById(walletId: string): Promise<Wallet> {
    const wallet = this.wallets.find((wallet) => wallet.id === walletId);

    if (!wallet) {
      throw new Error("Invalid wallet id");
    }

    return wallet;
  }

  public async findByName(name: string): Promise<Wallet> {
    const wallet = this.wallets.find(
      (wallet) => wallet.properties.name === name
    );

    if (!wallet) {
      throw new Error("Invalid name");
    }

    return wallet;
  }

  public async getAll(userId: string): Promise<Wallet[]> {
    return this.wallets;
  }

  public async updateName(walletId: string, newName: string): Promise<void> {
    let walletToUpdate = await this.findById(walletId);

    walletToUpdate.properties.name = newName;
  }

  public async deleteWallet(id: string): Promise<void> {}

  public async exists(id: string): Promise<boolean> {
    const walletExists = this.wallets.some((wallet) => wallet.id === id);

    return walletExists;
  }
}
