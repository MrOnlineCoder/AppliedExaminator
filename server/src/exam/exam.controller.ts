import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ExamCreateDto, ExamSaveDto } from './exam.dto';
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

    @Post('/save')
    async saveExam(@Body() body : ExamSaveDto) {
        return {
            success: await this.examService.saveExam(body)
        }
    }

    @Post('/run/:id')
    async runExam(@Param('id') id: string) {
        return {
            exam: await this.examService.runExam(id)
        }
    }
}
