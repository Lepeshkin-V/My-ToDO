import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Table } from '../entities/tables.entity';
import { MongoRepository } from 'typeorm';
import { CreateTableDto } from '../dtos/create-table.dto';
import { ObjectId } from 'mongodb';
import { UpdateTableDto } from '../dtos/update-table.dto';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(Table)
    private readonly tablesRepository: MongoRepository<Table>,
  ) {}

  async create(createTableDto: CreateTableDto): Promise<Table> {
    return this.tablesRepository.save(createTableDto);
  }

  async getByUserId(userId: string): Promise<Table[]> {
    return this.tablesRepository.find({ where: { userId: userId } });
  }

  async getById(tableId: string): Promise<Table> {
    return this.tablesRepository.findOne({
      where: { _id: new ObjectId(tableId) },
    });
  }

  async update(tableId: string, dto: UpdateTableDto) {
    return this.tablesRepository.findOneAndUpdate(
      { _id: new ObjectId(tableId) },
      { $set: dto.title },
    );
  }

  async delete(tableId: string): Promise<boolean> {
    try {
      await this.tablesRepository.deleteOne({ _id: new ObjectId(tableId) });
      return true;
    } catch (error) {
      return false;
    }
  }
}
