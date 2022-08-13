import { IWalletsRepository } from "../repositories/IWalletsRepository";
import { randomUUID } from "crypto";
import { Wallet } from "../Wallet";

type CreateWalletServiceRequest = {
  name: string;
  amount: number;
  color: string;
  createdAt: Date;

  userId: string;
};

export class CreateWalletService {
  constructor(private walletsRepository: IWalletsRepository) {}

  async execute(wallet: CreateWalletServiceRequest) {
    if (wallet.name.trim().length < 4 || wallet.name.trim().length > 24) {
      throw new Error("Invalid name");
    }

    const walletAlreadyExists = await this.walletsRepository.findByName(
      wallet.name
    );

    if (walletAlreadyExists) {
      throw new Error("Wallet already created");
    }

    const walletId = randomUUID();

    const newWallet = Wallet.create(
      {
        name: wallet.name,
        amount: wallet.amount,
        color: wallet.color,
        userId: wallet.userId,
        createdAt: wallet.createdAt,

        expenses: [],
      },
      walletId
    );

    const result = await this.walletsRepository.create(newWallet);

    return result;
  }
}
