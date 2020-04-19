import { Injectable, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Testbook } from './testbooks.interface';
import { Model } from 'mongoose';
import { TestbookCreateDto } from './testbooks.dto';

@Injectable()
export class TestbooksService {
    private logger = new Logger('TesbooksService');

    constructor(
        @InjectModel('Testbook') private readonly testbookModel : Model<Testbook>
    ) {

    }

    async getTestbooks() : Promise<Testbook[]> {
        try {
            const testbooks = await this.testbookModel.find().sort({
                created_at: -1
            }).exec();

            return testbooks;
        } catch(e) {
            this.logger.error(`getTestbooks(): DB error`, e);
            throw new InternalServerErrorException('Database query error');
        }
    }

    async getTestbook(id: string): Promise<Testbook> {
        try {
            const testbook = await this.testbookModel.findOne({
                _id: id
            }).exec();

            if (!testbook) {
                throw new NotFoundException(`Testbook not found.`);
            }

            return testbook;
        } catch (e) {
            this.logger.error(`getTestbook(): DB error`, e);
            throw new InternalServerErrorException('Database query error');
        }
    }

    async createTestbook(data: TestbookCreateDto) {
        try {
            const testbook = new this.testbookModel({
                title: data.title,
                category: data.category,
                created_at: new Date(),
                questions: []
            });

            const saved = await testbook.save();

            return saved;
        } catch(e) {
            this.logger.error(`createTestbook(): DB error`, e);
            throw new InternalServerErrorException('Database write error');
        }
    }

    async updateTestbook(testbook: Testbook) {
        try {
            let doc = await this.testbookModel.findById(testbook._id);

            doc.questions = testbook.questions;
            
            const saved = await doc.save();

            return saved;
        } catch(e) {
            this.logger.error(`updateTestbook(): DB error`, e);
            throw new InternalServerErrorException('Database write error.');
        }
    }

    async getTestbookQuestions(id: string, include_correct = false) {
        try {
            const projection = include_correct ? {} : {
                'questions.correct': 0
            };

            const testbook = await this.testbookModel.findById(id, projection);

            return testbook.questions;
        } catch (e) {
            this.logger.error(`getTestbookQuestions(): DB error`, e);
            throw new InternalServerErrorException('Database query error.');
        }
    }
}
