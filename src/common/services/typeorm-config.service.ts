import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mongodb',
      url: this.configService.get<string>('db.url'),
      database: this.configService.get<string>('db.database'),
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
    };
  }
}
