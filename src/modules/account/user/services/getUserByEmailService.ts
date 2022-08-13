import { User } from "../User";
import { IUsersRepository } from "../repositories/IUsersRepository";

export class GetUserByEmailService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(email: string): Promise<User> {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email) {
      throw new Error("No email found");
    }

    if (!emailRegex.test(email)) {
      throw new Error("Invalid email");
    }

    const user = await this.usersRepository.findByEmail(email);

    return user;
  }
}
