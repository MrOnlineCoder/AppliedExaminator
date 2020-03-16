import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { MongooseModule } from '@nestjs/mongoose';
import ExamSchema from './exam.schema';
import { TestbooksModule } from '../testbooks/testbooks.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Exam',
      schema: ExamSchema
    }]),
    TestbooksModule
  ],
  controllers: [ExamController],
  providers: [ExamService]
})
export class ExamModule {}
