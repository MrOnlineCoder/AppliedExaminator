import { Injectable, Logger, InternalServerErrorException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Exam } from './exam.interface';
import { Model } from 'mongoose';
import { ExamCreateDto, ExamSaveDto } from './exam.dto';
import { TestbooksService } from '../testbooks/testbooks.service';

@Injectable()
export class ExamService {
    private logger = new Logger('ExamService');

    public Statuses = {
        Preparing: 'preparing',
        Running: 'running'
    }

    constructor(
        @InjectModel('Exam') private readonly examModel: Model<Exam>,
        private readonly testbookService: TestbooksService
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

    async getPublic() {
        try {
            const exams = await this.examModel.find({
                public: true,
                status: this.Statuses.Running
            }, {
                testbook_id: 0
            }).sort({
                created_at: -1
            }).exec();

            return exams;
        } catch (e) {
            this.logger.error(`getPublic(): DB error`, e);
            throw new InternalServerErrorException(`Database query error.`);
        }
    }

    async getExam(id: string) {
        try {
            const exam = await this.examModel.findOne({
                _id: id
            });

            if (!exam) {
                throw new NotFoundException(`Requested exam not found.`);
            }

            return exam;
        } catch(e) {
            this.logger.error(`getExam(): DB error`, e);
            throw new InternalServerErrorException(`Database query error.`);
        }
    }

    async createExam(data: ExamCreateDto) {
        try {
            const exam = new this.examModel({
                title: data.title,
                created_at: new Date(),
                status: this.Statuses.Preparing
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
            exam.status = this.Statuses.Running;

            exam.markModified('status');
            exam.markModified('started_at');

            const saved = await exam.save();

            return saved;
        } catch (e) {
            this.logger.error(`saveExam(): DB error`, e);
            throw new InternalServerErrorException(`Database write error.`);
        }
    }

    async getExamAndQuestions(id: string) {
        try {
            const exam = await this.examModel.findById(id);

            if (exam.status !== this.Statuses.Running) {
                throw new ForbiddenException(`Exam is not running.`);
            }

            const questions = await this.testbookService.getTestbookQuestions(exam.testbook_id);

            return {
                exam,
                questions
            }
        } catch(e) {
            this.logger.error(`getExamAndQuestions(): DB error`, e);
            throw new InternalServerErrorException(`Database query error.`);
        }
    }
}
