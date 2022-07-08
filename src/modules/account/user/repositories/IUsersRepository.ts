import { User } from "@prisma/client";
import { IUserDTO } from "../dto/userDTO";

export interface IUsersRepository {
  create(user: IUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  exists(user: IUserDTO): Promise<boolean>;
  updateName(user: IUserDTO): Promise<void>;
  deleteUser(user: IUserDTO): Promise<void>;
}
