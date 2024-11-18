import { User } from "../../../domain/users/user.entity";
import { UserRepository } from "../../../domain/users/user.repository";

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(name: string, email: string, age: number): Promise<User> {
    const user = new User("", name, email, age);
    return await this.userRepository.create(user);
  }
}
