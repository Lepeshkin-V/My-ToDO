import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Table } from '../entities/tables.entity';
import { MongoRepository } from 'typeorm';
import { CreateFeatureTableDto } from '../dtos/create-feature-table.dto';
import { ObjectId } from 'mongodb';
import { UpdateFeatureTableDto } from '../dtos/update-feature-table.dto';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(Table)
    private readonly tablesRepository: MongoRepository<Table>,
  ) {}

  async create(dto: CreateFeatureTableDto): Promise<Table> {
    const { title, userId } = dto;

    const table = await this.tablesRepository.save({
      title: title,
      userId: userId,
    });

    return table;
  }

  async getByUserId(userId: string): Promise<Table[]> {
    const tables = await this.tablesRepository.find({
      where: { userId: userId },
    });

    return tables;
  }

  async getById(tableId: string): Promise<Table> {
    const table = await this.tablesRepository.findOne({
      where: { _id: new ObjectId(tableId) },
    });

    return table;
  }

  async update(tableId: string, dto: UpdateFeatureTableDto): Promise<Table> {
    const { title } = dto;

    const table = await this.tablesRepository.save({
      _id: new ObjectId(tableId),
      title: title,
    });

    return table;
  }

  async delete(tableId: string) {
    await this.tablesRepository.deleteOne({ _id: new ObjectId(tableId) });
  }
}
