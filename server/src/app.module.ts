import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ExamModule } from './exam/exam.module';
import {MongooseModule} from '@nestjs/mongoose'
import { TestbooksModule } from './testbooks/testbooks.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/applied_exam', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    ExamModule,
    TestbooksModule
  ],
  controllers: [AppController]
})
export class AppModule {}
