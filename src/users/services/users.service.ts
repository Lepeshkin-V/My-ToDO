import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from '../entities/users.entity';
import { ObjectId } from 'mongodb';
import { AuthFeatureDto } from 'src/auth/dtos/auth-feature.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: MongoRepository<User>,
  ) {}

  async getOneByLogin(login: string): Promise<User> {
    const user = this.usersRepository.findOne({
      where: { login: login },
    });

    return user;
  }

  async getByLoginAndPassword(dto: AuthFeatureDto): Promise<User> {
    const { login, password } = dto;

    const user = await this.usersRepository.findOne({
      where: { login: login, password: password },
    });

    return user;
  }

  async getOneOrFail(id: string): Promise<User> {
    const user = await this.usersRepository.findOneOrFail({
      where: { _id: new ObjectId(id) },
    });

    return user;
  }

  async create(dto: AuthFeatureDto): Promise<User> {
    const { login, password } = dto;

    const user = await this.usersRepository.save(
      this.usersRepository.create({ login: login, password: password }),
    );

    return user;
  }
}
