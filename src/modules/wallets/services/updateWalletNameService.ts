import { IWalletsRepository } from "../repositories/IWalletsRepository";
import { IWalletDTO } from "../walletDTO";

type UpdateWalletNameServiceRequest = {
  walletId: string;
  newName: string;
};

export class UpdateWalletNameService {
  constructor(private walletsRepository: IWalletsRepository) {}

  async execute({ walletId, newName }: UpdateWalletNameServiceRequest) {
    if (newName.trim().length < 4 || newName.trim().length > 24) {
      throw new Error("Invalid name");
    }
    if (!newName) {
      throw new Error("New Name not found");
    }

    if (!walletId) {
      throw new Error("Wallet Id not found");
    }

    await this.walletsRepository.updateName(walletId, newName);

    return;
  }
}
