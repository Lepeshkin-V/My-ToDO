import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Table } from "../entities/tables.entity";
import { MongoRepository } from "typeorm";
import { CreateTableDto } from "../dtos/create-table.dto";
import { ObjectId } from "mongodb";

@Injectable()

export class TablesService {
    constructor(@InjectRepository(Table) private readonly tablesRepository: MongoRepository<Table>){}

    async create(createTableDto: CreateTableDto): Promise<Table>{
        return await this.tablesRepository.save(createTableDto);
    }

    async getByUserId(userId: string): Promise<Table[]> {
        return await this.tablesRepository.find({where: {userId: userId}});
    }

    async getById(tableId: string): Promise<Table> {
        return await this.tablesRepository.findOne({where: { _id: new ObjectId(tableId) }})
    }

    async update(tableId: string, title: string) {
        return await this.tablesRepository.findOneAndUpdate({ _id: new ObjectId(tableId) }, { $set: title })
    }

    async delete(tableId: string): Promise<boolean> {
        try {
            await this.tablesRepository.deleteOne({ _id: new ObjectId(tableId)});
            return true;
        } catch (error) {
            return false;
        }
    }
}