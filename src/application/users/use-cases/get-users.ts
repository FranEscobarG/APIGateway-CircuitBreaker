import { UserRepository } from "../../../domain/users/user.repository";

export class GetUsers {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    return await this.userRepository.findAll();
  }
}
