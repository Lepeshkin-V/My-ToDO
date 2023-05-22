import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from '../entities/users.entity';
import { ObjectId } from 'mongodb';
import { AuthDto } from 'src/auth/dtos/auth.dto';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: MongoRepository<User>,
  ) {}

  async getOneByLogin(login: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { login: login },
    });
  }

  async getByLoginAndPassword(login: string, password: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { login: login, password: password },
    });
  }

  async getOneOrFail(id: string): Promise<User> {
    return this.usersRepository.findOneOrFail({
      where: { _id: new ObjectId(id) },
    });
  }

  async create(user: AuthDto): Promise<User> {
    return this.usersRepository.save(this.usersRepository.create(user));
  }
}
