import type { IHash } from "@modules/account/auth/hash/IHash";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { randomUUID } from "crypto";
import { User } from "../User";

type CreateUserServiceRequest = {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
};

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class CreateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private hasher: IHash
  ) {}

  async execute({
    name,
    email,
    password,
    createdAt,
  }: CreateUserServiceRequest): Promise<User> {
    if (!email) {
      throw new Error("No email found");
    }

    if (!emailRegex.test(email)) {
      throw new Error("Invalid email");
    }

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await this.hasher.generateHash(password);

    const userId = randomUUID();

    const user = User.create(
      {
        name,
        email,
        password: passwordHash,
        createdAt,
        wallets: [],
      },
      userId
    );

    const result = await this.usersRepository.create(user);

    return user;
  }
}
