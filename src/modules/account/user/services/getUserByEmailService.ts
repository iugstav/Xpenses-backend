import { BCryptHash } from "@modules/account/auth/hash/implementations/BCrypthash";
import { User } from "@prisma/client";
import { UsersRepository } from "../repositories/implementations/PrismaUsers.repository";

export class GetUserByEmailService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(email: string): Promise<User> {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email || email.trim().length > 100) {
      throw new Error("No email found.");
    }

    if (!emailRegex.test(email)) {
      throw new Error("Invalid email.");
    }

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }
}
