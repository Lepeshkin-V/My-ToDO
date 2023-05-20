import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { User } from "../entities/users.entity";
import { ObjectId } from "mongodb";
import { CreateUserDto } from "../dtos/create-user.dto";

@Injectable()

export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: MongoRepository<User>){}

    async getCountByLogin(login: string): Promise<number> {
        return await this.usersRepository.count({login});;
    }

    async getByLoginAndPassword(login: string, password: string): Promise<User> {
        return await this.usersRepository.findOne({where: {login: login, password: password}})
    }

    async getOneOrFail(id: string): Promise<User> {
        return await this.usersRepository.findOneOrFail({where: {_id: new ObjectId(id)}});
    }

    async create(user: CreateUserDto): Promise<User> {
        return this.usersRepository.save(this.usersRepository.create(user))
    }
}