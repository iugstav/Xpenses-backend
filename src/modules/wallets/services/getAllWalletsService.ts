import { IWalletsRepository } from "../repositories/IWalletsRepository";

export class GetAllWalletsService {
  constructor(private walletsRepository: IWalletsRepository) {}

  async execute(userId: string) {
    if (userId.length < 30) {
      throw new Error("invalid ID");
    }

    const result = await this.walletsRepository.getAll(userId);

    if (!result) {
      throw new Error("Wallets not found");
    }

    return result;
  }
}
