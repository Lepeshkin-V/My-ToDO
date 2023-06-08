import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration, {
  validationOptions,
  validationSchema,
} from './config/configuration';
import { NotesModule } from './notes/notes.module';
import { TablesModule } from './tables/tables.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './common/services/typeorm-config.service';

@Module({
  imports: [
    AuthModule,
    NotesModule,
    TablesModule,
    UsersModule,

    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
      validationOptions: validationOptions,
    }),

    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class AppModule {}
