import { Expense } from "@modules/expenses/Expense";
import { prismaClient } from "@src/prisma";
import { IExpensesRepository } from "../IExpensesRepository";

export class ExpensesRepository implements IExpensesRepository {
  checkIfAmountIsBiggerThanWallet(name: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async create(expense: Expense): Promise<Expense> {
    const wallet = await prismaClient.wallet.findUnique({
      where: { id: expense.properties.walletId },
    });

    if (!wallet) {
      throw new Error("Invalid wallet id.");
    }

    const { id, name, amount, description, walletId, createdAt } =
      await prismaClient.expenses.create({
        data: {
          name: expense.properties.name,
          amount: expense.properties.amount,
          description: expense.properties.description,
          walletId: wallet.id,
        },
      });

    return Expense.create(
      { name, amount, description, createdAt, walletId },
      id
    );
  }

  async findById(id: string): Promise<Expense> {
    const result = await prismaClient.expenses.findUnique({
      where: { id },
    });

    if (!result) {
      throw new Error("Invalid id");
    }

    return Expense.create(
      {
        name: result.name,
        amount: result.amount,
        description: result.description,
        createdAt: result.createdAt,
        walletId: result.walletId,
      },
      result.id
    );
  }

  async findByName(name: string): Promise<Expense> {
    const result = await prismaClient.expenses.findFirst({
      where: { name },
    });

    if (!result) {
      throw new Error("Invalid name");
    }

    return Expense.create(
      {
        name: result.name,
        amount: result.amount,
        description: result.description,
        createdAt: result.createdAt,
        walletId: result.walletId,
      },
      result.id
    );
  }

  async getWalletExpenses(walletId: string): Promise<Expense[]> {
    const result = await prismaClient.expenses.findMany({
      where: { walletId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return result.map((expense) => {
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
  }

  async exists(name: string): Promise<boolean> {
    return (await this.findByName(name)) ? true : false;
  }

  async updateAmount(expenseId: string, newAmount: number): Promise<void> {
    const expenseToUpdate = await prismaClient.expenses.findUnique({
      where: { id: expenseId },
    });

    if (!expenseToUpdate) {
      throw new Error("Invalid id");
    }

    await prismaClient.expenses.update({
      data: {
        amount: newAmount,
      },
      where: {
        id: expenseToUpdate.id,
      },
    });

    return;
  }

  async deleteExpense(id: string): Promise<void> {
    await prismaClient.expenses.delete({
      where: { id },
    });
  }
}
