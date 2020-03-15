import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Exam } from './exam.interface';
import { Model } from 'mongoose';
import { ExamCreateDto } from './exam.dto';

@Injectable()
export class ExamService {
    private logger = new Logger('ExamService');

    constructor(
        @InjectModel('Exam') private readonly examModel: Model<Exam>
    ) {

    }

    async getAll() {
        try {
            const exams = await this.examModel.find().sort({
                created_at: -1
            }).exec();

            return exams;
        } catch(e) {
            this.logger.error(`getAll(): DB error`, e);
            throw new InternalServerErrorException(`Database query error.`);
        }
    }

    async createExam(data: ExamCreateDto) {
        try {
            const exam = new this.examModel({
                title: data.title,
                created_at: new Date(),
                status: 'preparing'
            });

            const saved = await exam.save();

            return saved;
        } catch (e) {
            this.logger.error(`createExam(): DB error`, e);
            throw new InternalServerErrorException('Database write error');
        }
    }
}
