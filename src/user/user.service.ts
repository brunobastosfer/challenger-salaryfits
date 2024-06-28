import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repository/users.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findAll() {
    return `This action returns all user`;
  }

  async findById(id: string) {
    try {
      return await this.userRepository.findById(id);
    } catch {
      throw new NotFoundException('usuário com esse id não encontrado');
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userRepository.findByEmail(email);
    } catch {
      throw new NotFoundException('usuário com esse e-mail não encontrado');
    }
  }
}
