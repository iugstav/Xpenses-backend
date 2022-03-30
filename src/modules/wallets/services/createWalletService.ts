import { IWalletsRepository } from "../repositories/IWalletsRepository";
import { IWalletDTO } from "../walletDTO";

export class CreateWalletService {
  constructor(private walletsRepository: IWalletsRepository) {}

  async execute(wallet: IWalletDTO, email: string) {
    if (wallet.name.trim().length < 4 || wallet.name.trim().length > 24) {
      throw new Error("Invalid name");
    }

    const walletAlreadyExists = await this.walletsRepository.exists(wallet);

    if (walletAlreadyExists) {
      throw new Error("Wallet already created");
    }

    const result = await this.walletsRepository.create(wallet, email);

    return result;
  }
}
