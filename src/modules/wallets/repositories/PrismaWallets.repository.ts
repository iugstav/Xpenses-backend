import { Wallet } from "@prisma/client";
import { prismaClient } from "@src/prisma";
import { IWalletDTO } from "../walletDTO";
import { IWalletsRepository } from "./IWalletsRepository";

export class WalletsRepository implements IWalletsRepository {
  async create(wallet: IWalletDTO, email: string): Promise<Wallet> {
    const user = await prismaClient.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid user");
    }

    const result = await prismaClient.wallet.create({
      data: {
        name: wallet.name,
        color: wallet.color,
        amount: wallet.amount,
        userId: user.id,
      },
    });

    return result;
  }

  async findByName(name: string): Promise<Wallet | null> {
    const result = await prismaClient.wallet.findFirst({
      where: { name },
    });

    if (!result) {
      return null;
    }

    return result;
  }

  async findById(walletId: string): Promise<Wallet | null> {
    const result = await prismaClient.wallet.findFirst({
      where: { id: walletId },
    });

    if (!result) {
      return null;
    }

    return result;
  }

  async getAll(userId: string): Promise<Wallet[]> {
    const result = await prismaClient.wallet.findMany({
      where: { userId },
      orderBy: {
        createdAt: "asc",
      },
    });

    return result;
  }

  async exists(wallet: IWalletDTO): Promise<boolean> {
    return (await this.findByName(wallet.name)) ? true : false;
  }

  async updateName(wallet: IWalletDTO, newName: string): Promise<void> {
    const walletToUpdate = await this.findByName(wallet.name);

    if (!walletToUpdate) {
      throw new Error("Invalid Wallet");
    }

    await prismaClient.wallet.update({
      data: {
        name: newName,
      },
      where: {
        id: walletToUpdate?.id,
      },
    });

    return;
  }

  async deleteWallet(wallet: IWalletDTO): Promise<void> {
    await prismaClient.wallet.delete({
      where: { name: wallet.name },
    });

    return;
  }
}
