import { IWalletsRepository } from "../repositories/IWalletsRepository";
import { IWalletDTO } from "../walletDTO";

export class DeleteWalletService {
  constructor(private walletsRepository: IWalletsRepository) {}

  async execute(id: string) {
    if (id.length === 0) {
      throw new Error("Id not passed");
    }

    await this.walletsRepository.deleteWallet(id);

    return;
  }
}
