import { Expense } from "@modules/expenses/Expense";
import { Wallet } from "@modules/wallets/Wallet";
import { prismaClient } from "@src/prisma";
import { randomUUID } from "crypto";

import { User } from "../../User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  async create({ id, properties }: User): Promise<User> {
    const walletId = randomUUID();

    const result = await prismaClient.user.create({
      data: {
        id,
        name: properties.name,
        email: properties.email,
        password: properties.password,
        createdAt: properties.createdAt,

        Wallet: {
          create: {
            id: walletId,
            name: "Exemplo",
            amount: 100.0,
            color: "",
            createdAt: new Date(),
            expenses: [] as any,
          },
        },
      },

      include: {
        Wallet: true,
      },
    });

    const {
      id: wallet_id,
      name,
      amount,
      color,
      createdAt,
      userId,
    } = result.Wallet[0];

    const wallet = Wallet.create(
      {
        name,
        amount,
        color,
        createdAt,
        userId,
        expenses: [],
      },
      wallet_id
    );

    const user = User.create({
      name: result.name,
      email: result.email,
      password: result.password,
      createdAt: result.createdAt,
      wallets: [wallet],
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const result = await prismaClient.user.findUnique({
      where: { email },
      include: {
        Wallet: {
          include: {
            expenses: true,
          },
        },
      },
    });

    if (!result) {
      throw new Error("User not found");
    }

    const mappedWallets = result.Wallet.map((wallet) => {
      const mappedExpenses = wallet.expenses.map((expense) => {
        return Expense.create(
          {
            name: expense.name,
            amount: expense.amount,
            description: expense.description,
            createdAt: expense.createdAt,
            walletId: expense.walletId,
          },
          expense.id
        );
      });

      return Wallet.create({
        name: wallet.name,
        amount: wallet.amount,
        color: wallet.color,
        userId: wallet.userId,
        createdAt: wallet.createdAt,
        expenses: mappedExpenses,
      });
    });

    const user = User.create(
      {
        name: result.name,
        email: result.email,
        password: result.password,
        createdAt: result.createdAt,
        wallets: mappedWallets,
      },
      result.id
    );

    return user;
  }

  async exists(email: string): Promise<boolean> {
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    const userExists = user ? true : false;

    return userExists;
  }

  async updateName(userId: string, newName: string): Promise<void> {
    await prismaClient.user.update({
      data: {
        name: newName,
      },

      where: { id: userId },
    });

    return;
  }

  async deleteUser(id: string): Promise<void> {
    await prismaClient.user.delete({
      where: {
        id,
      },
    });

    return;
  }
}
