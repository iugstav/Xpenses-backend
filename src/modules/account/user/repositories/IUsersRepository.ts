import { User } from "../User";

export interface IUsersRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
  exists(email: string): Promise<boolean>;
  updateName(userId: string, newName: string): Promise<void>;
  deleteUser(userId: string): Promise<void>;
}
