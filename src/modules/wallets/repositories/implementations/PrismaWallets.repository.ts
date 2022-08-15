import { Wallet } from "../../Wallet";
import { prismaClient } from "@src/prisma";
import { IWalletDTO } from "../../walletDTO";
import { IWalletsRepository } from "../IWalletsRepository";
import { Expense } from "@modules/expenses/Expense";

export class WalletsRepository implements IWalletsRepository {
  async create(wallet: Wallet): Promise<Wallet> {
    const user = await prismaClient.user.findUnique({
      where: { id: wallet.properties.userId },
    });

    if (!user) {
      throw new Error("Invalid user id.");
    }

    const { id, name, color, amount, userId, createdAt } =
      await prismaClient.wallet.create({
        data: {
          id: wallet.id,
          name: wallet.properties.name,
          color: wallet.properties.color,
          amount: wallet.properties.amount,
          userId: user.id,
        },
      });

    return Wallet.create(
      {
        name,
        color,
        amount,
        userId,
        createdAt,
        expenses: [],
      },
      id
    );
  }

  async findByName(name: string): Promise<Wallet> {
    const result = await prismaClient.wallet.findFirst({
      where: { name },

      include: {
        expenses: true,
      },
    });

    if (!result) {
      throw new Error("Invalid name");
    }

    const mappedExpenses = result.expenses.map((expense) => {
      return Expense.create({
        name: expense.name,
        amount: expense.amount,
        description: expense.description,
        walletId: expense.walletId,
        createdAt: expense.createdAt,
      });
    });

    return Wallet.create(
      {
        name: result.name,
        amount: result.amount,
        color: result.color,
        userId: result.userId,
        expenses: mappedExpenses,
        createdAt: result.createdAt,
      },
      result.id
    );
  }

  async findById(walletId: string): Promise<Wallet> {
    const result = await prismaClient.wallet.findFirst({
      where: { id: walletId },

      include: {
        expenses: true,
      },
    });

    if (!result) {
      throw new Error("Invalid wallet id");
    }

    const mappedExpenses = result.expenses.map((expense) => {
      return Expense.create({
        name: expense.name,
        amount: expense.amount,
        description: expense.description,
        walletId: expense.walletId,
        createdAt: expense.createdAt,
      });
    });

    return Wallet.create(
      {
        name: result.name,
        amount: result.amount,
        color: result.color,
        userId: result.userId,
        expenses: mappedExpenses,
        createdAt: result.createdAt,
      },
      result.id
    );
  }

  async getAll(userId: string): Promise<Wallet[]> {
    const result = await prismaClient.wallet.findMany({
      where: { userId },
      orderBy: {
        createdAt: "asc",
      },

      include: {
        expenses: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    /**
     * I have mapped the expenses array because the Wallet entity
     * does not accept the expense model from prisma.
     */
    return result.map((wallet) => {
      const mappedExpenses = wallet.expenses.map((expense) => {
        return Expense.create({
          name: expense.name,
          amount: expense.amount,
          description: expense.description,
          walletId: expense.walletId,
          createdAt: expense.createdAt,
        });
      });

      return Wallet.create(
        {
          name: wallet.name,
          amount: wallet.amount,
          color: wallet.color,
          userId: wallet.userId,
          expenses: mappedExpenses,
          createdAt: wallet.createdAt,
        },
        wallet.id
      );
    });
  }

  async exists(id: string): Promise<boolean> {
    const wallet = await prismaClient.wallet.findUnique({
      where: { id },
    });

    const walletExists = wallet ? true : false;

    return walletExists;
  }

  async updateName(walletId: string, newName: string): Promise<void> {
    const walletToUpdate = await this.findById(walletId);

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

  async deleteWallet(id: string): Promise<void> {
    await prismaClient.wallet.delete({
      where: { id },
    });

    return;
  }
}
