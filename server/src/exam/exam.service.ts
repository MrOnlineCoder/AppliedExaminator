import { Injectable, Logger, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Exam } from './exam.interface';
import { Model } from 'mongoose';
import { ExamCreateDto, ExamSaveDto } from './exam.dto';

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

    async saveExam(dto: ExamSaveDto) {
        try {
            const id = dto.exam._id;

            delete dto.exam._id;

            await this.examModel.updateOne({
                _id: id
            }, {
                $set: dto.exam
            });

            return true;
        } catch(e) {
            this.logger.error(`saveExam(): DB error`, e);
            throw new InternalServerErrorException(`Database write error.`);
        }
    }

    async runExam(id: string) {
        try {
            let exam = await this.examModel.findById(id);

            if (!exam.testbook_id) {
                throw new ForbiddenException('Exam testbook is not set.');
            } 

            exam.started_at = new Date();
            exam.status = 'running';

            exam.markModified('status');
            exam.markModified('started_at');

            const saved = await exam.save();

            return saved;
        } catch (e) {
            this.logger.error(`saveExam(): DB error`, e);
            throw new InternalServerErrorException(`Database write error.`);
        }
    }
}
