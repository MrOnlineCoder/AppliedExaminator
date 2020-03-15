import { Controller, Post, Body, Get } from '@nestjs/common';
import { ExamCreateDto } from './exam.dto';
import { ExamService } from './exam.service';

@Controller('exam')
export class ExamController {

    constructor(
        private readonly examService: ExamService
    ) {

    }

    @Get('/all')
    async getAll() {
        return {
            exams: await this.examService.getAll()
        }
    }

    @Post('/create')
    async createExam(@Body() body: ExamCreateDto) {
        return {
            exam: await this.examService.createExam(body)
        }
    }
}
