import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { MongoDbService } from 'src/infrastructure/persistence/bds/mongodb/MongoDb.service';
import { GlobalExceptionFilter } from '../api/http-rest/global-exception/global.exception';
import { UserModule } from './user.module';
import { OrderModule } from './order.module';

@Module({
  imports: [UserModule, OrderModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [
    MongoDbService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class RootModule {}
