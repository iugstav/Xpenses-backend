import { Expenses } from "@prisma/client";
import { prismaClient } from "@src/prisma";
import { IExpensesDTO } from "../expensesDTO";
import { IExpensesRepository } from "./IExpensesRepository";

export class ExpensesRepository implements IExpensesRepository {
  async create(expense: IExpensesDTO, walletId: string): Promise<Expenses> {
    const wallet = await prismaClient.wallet.findFirst({
      where: { id: walletId },
    });

    if (!wallet) {
      throw new Error("Invalid wallet id.");
    }

    const result = await prismaClient.expenses.create({
      data: {
        name: expense.name,
        amount: expense.amount,
        description: expense.description,
        walletId: wallet.id,
      },
    });

    return result;
  }

  async findById(id: string): Promise<Expenses | null> {
    const result = await prismaClient.expenses.findUnique({
      where: { id },
    });

    return result;
  }

  async findByName(name: string): Promise<Expenses | null> {
    const result = await prismaClient.expenses.findFirst({
      where: { name },
    });

    return result;
  }

  async getWalletExpenses(walletId: string): Promise<Expenses[]> {
    const result = await prismaClient.expenses.findMany({
      where: { walletId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return result;
  }

  async exists(expense: IExpensesDTO): Promise<boolean> {
    return (await this.findByName(expense.name)) ? true : false;
  }

  async updateAmount(expense: IExpensesDTO, newAmount: number): Promise<void> {
    const expenseToUpdate = await this.findByName(expense.name);

    if (!expenseToUpdate) {
      throw new Error("Invalid expense");
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

  async deleteExpense(expense: IExpensesDTO): Promise<void> {
    await prismaClient.expenses.delete({
      where: { name: expense.name },
    });
  }

  //it returns false if amount < wallet and true if amount > wallet
  async checkIfAmountIsBiggerThanWallet(
    expense: IExpensesDTO
  ): Promise<boolean> {
    const expenseAmount = await this.findByName(expense.name);

    if (!expenseAmount) {
      throw new Error("expense does not exist.");
    }

    const walletAmount = await prismaClient.wallet.findFirst({
      where: { id: expenseAmount.walletId },
    });

    if (!walletAmount) {
      throw new Error("wallet amount not found;");
    }

    return expenseAmount.amount > walletAmount.amount ? true : false;
  }
}
