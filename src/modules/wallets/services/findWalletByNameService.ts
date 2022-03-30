import { IWalletsRepository } from "../repositories/IWalletsRepository";

export class FindWalletByNameService {
  constructor(private walletsRepository: IWalletsRepository) {}

  async execute(name: string) {
    if (name.trim().length < 4 || name.trim().length > 24) {
      throw new Error("Invalid name");
    }

    const result = await this.walletsRepository.findByName(name);

    if (!result) {
      throw new Error("Invalid name");
    }

    return result;
  }
}
