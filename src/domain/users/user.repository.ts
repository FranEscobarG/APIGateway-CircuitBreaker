import { User } from "./user.entity";

export interface UserRepository {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
}