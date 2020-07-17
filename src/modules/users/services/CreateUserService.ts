import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppErros';

import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashsedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashsedPassword,
    });

    return user;
  }
}
export default CreateUserService;