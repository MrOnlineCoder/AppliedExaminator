import { Module } from '@nestjs/common';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';
import { ExamModule } from '../exam/exam.module';
import { MongooseModule } from '@nestjs/mongoose';
import SubmissionSchema from './submissions.schema';
import { TestbooksModule } from '../testbooks/testbooks.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Submission',
      schema: SubmissionSchema
    }]),
    ExamModule,
    TestbooksModule
  ],
  controllers: [SubmissionsController],
  providers: [SubmissionsService]
})
export class SubmissionsModule {}
