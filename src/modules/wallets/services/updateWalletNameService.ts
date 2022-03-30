import { IWalletsRepository } from "../repositories/IWalletsRepository";
import { IWalletDTO } from "../walletDTO";

export class UpdateWalletNameService {
  constructor(private walletsRepository: IWalletsRepository) {}

  async execute(wallet: IWalletDTO, newName: string) {
    if (wallet.name.trim().length < 4 || wallet.name.trim().length > 24) {
      throw new Error("Invalid name");
    }
    if (!wallet.name) {
      throw new Error("Name not found");
    }

    if (wallet.color.length < 4 || wallet.color.length > 12) {
      throw new Error("Invalid color");
    }
    if (!wallet.color) {
      throw new Error("Color not found");
    }

    if (!newName) {
      throw new Error("New name not found");
    }

    await this.walletsRepository.updateName(wallet, newName);

    return;
  }
}
