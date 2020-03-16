import { Module } from '@nestjs/common';
import { TestbooksService } from './testbooks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TestbooksController } from './testbooks.controller';
import TestbookSchema from './testbooks.schema';

@Module({
  exports: [TestbooksService],
  imports: [
    MongooseModule.forFeature([{
      name: 'Testbook',
      schema: TestbookSchema
    }])
  ],
  providers: [TestbooksService],
  controllers: [TestbooksController]
})
export class TestbooksModule {}
