import { User } from "@prisma/client";
import { prismaClient } from "@src/prisma";

import { IUserDTO } from "../dto/userDTO";
import { IUsersRepository } from "./IUsersRepository";

export class UsersRepository implements IUsersRepository {
  async create(user: IUserDTO): Promise<User> {
    const result = await prismaClient.user.create({
      data: user,
    });

    return result;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!result) {
      return null;
    }

    return result;
  }

  async exists(user: IUserDTO): Promise<boolean> {
    return (await prismaClient.user.findUnique({
      where: {
        email: user.email,
      },
    }))
      ? true
      : false;
  }

  async updateName(user: IUserDTO): Promise<void> {
    await prismaClient.user.update({
      data: {
        name: user.name,
      },

      where: { email: user.email },
    });

    return;
  }

  async deleteUser(user: IUserDTO): Promise<void> {
    await prismaClient.user.delete({
      where: {
        email: user.email,
      },
    });

    return;
  }
}
