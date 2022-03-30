import { IWalletsRepository } from "../repositories/IWalletsRepository";
import { IWalletDTO } from "../walletDTO";

export class DeleteWalletService {
  constructor(private walletsRepository: IWalletsRepository) {}

  async execute(wallet: IWalletDTO) {
    if (wallet.name.trim().length < 4 || wallet.name.trim().length > 24) {
      throw new Error("Invalid name");
    }
    if (!wallet.name) {
      throw new Error("Name not found");
    }

    await this.walletsRepository.deleteWallet(wallet);

    return;
  }
}
