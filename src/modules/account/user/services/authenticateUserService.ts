import { sign } from "jsonwebtoken";

import { User } from "@prisma/client";
import { BCryptHash } from "@modules/account/auth/hash/implementations/BCrypthash";
import { IUsersRepository } from "../repositories/IUsersRepository";

import { config } from "dotenv";
config();

type AuthenticateUserServiceRequest = {
  email: string;
  password: string;
};

type AuthenticateUserServiceResponse = {
  user: User;
  token: string;
};

export class AuthenticateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private hasher: BCryptHash
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserServiceRequest): Promise<AuthenticateUserServiceResponse> {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email || email.trim().length > 200) {
      throw new Error("No email found.");
    }

    if (!emailRegex.test(email)) {
      throw new Error("Invalid email.");
    }

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid email/password");
    }

    const passwordMatch = await this.hasher.compareHash(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new Error("Invalid email/password");
    }

    const token = sign({}, process.env.ACCESS_TOKEN_SECRET as string, {
      subject: user.id,
      expiresIn: "30d",
    });

    return {
      user,
      token,
    };
  }
}
