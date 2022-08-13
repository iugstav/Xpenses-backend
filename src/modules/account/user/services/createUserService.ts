import { BCryptHash } from "@modules/account/auth/hash/implementations/BCrypthash";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { User } from "@prisma/client";

type CreateUserServiceRequest = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private hasher: BCryptHash
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserServiceRequest): Promise<User> {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email || email.trim().length > 200) {
      throw new Error("No email found.");
    }

    if (!emailRegex.test(email)) {
      throw new Error("Invalid email.");
    }

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await this.hasher.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}
