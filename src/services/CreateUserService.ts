import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppErros';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const checkUserExists = await userRepository.findOne({
      where: { email },
    });
    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashsedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashsedPassword,
    });

    const saveUser = await userRepository.save(user);
    return saveUser;
  }
}
export default CreateUserService;
