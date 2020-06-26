import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

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
      throw new Error('Email address already used.');
    }

    const hashsedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashsedPassword,
    });
    console.log(user);

    const saveUser = await userRepository.save(user);
    console.log(saveUser);
    return saveUser;
  }
}
export default CreateUserService;
