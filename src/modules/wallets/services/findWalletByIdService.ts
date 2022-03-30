import { IWalletsRepository } from "../repositories/IWalletsRepository";

export class FindWalletByIdService {
  constructor(private walletsRepository: IWalletsRepository) {}

  async execute(id: string) {
    if (id.trim().length < 30) {
      throw new Error("invalid wallet id;");
    }

    const result = await this.walletsRepository.findById(id);

    if (!result) {
      throw new Error("invalid wallet id");
    }

    return result;
  }
}
