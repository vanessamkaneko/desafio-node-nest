import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { connect, disconnect } from 'mongoose';

export class MongoDbService implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await connect('mongodb://localhost:27017/desafio-nodenest');
    console.log('Mongo is connected');
  }

  async onModuleDestroy() {
    return await disconnect();
  }
}
