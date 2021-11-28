import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcryptjs from 'bcryptjs';

// define repository and the type of it which is Repository
@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    // hash password
    const salt = await bcryptjs.genSalt();
    const hashedPassoword = await bcryptjs.hash(password, salt);

    // save password with salt and hashed
    const user = this.create({ username, password: hashedPassoword });

    try {
      await this.save(user);
    } catch (err) {
      // check error code provided by postgres
      if (err.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already Existed.');
      } else {
        // throw interneral server error
        throw new InternalServerErrorException();
      }
    }
  }
}
