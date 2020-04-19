import { Injectable, Logger, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { SubmissionSendDto } from './submissions.dto';
import { ExamService } from '../exam/exam.service';
import { InjectModel } from '@nestjs/mongoose';
import { Submission } from './submissions.interface';
import { Model } from 'mongoose';
import { TestbooksService } from '../testbooks/testbooks.service';
import { Question } from '../testbooks/testbooks.interface';


@Injectable()
export class SubmissionsService {
    private logger = new Logger('SubmissionsService');
    
    constructor(
        private readonly examService: ExamService,
        private readonly testbooksService: TestbooksService,
        @InjectModel('Submission') private readonly submissionModel: Model<Submission>
    ) {

    }

    async create(body: SubmissionSendDto) {
        const exam = await this.examService.getExam(body.exam_id);

        if (exam.status != this.examService.Statuses.Running) {
            throw new ForbiddenException(`Exam is not running.`);
        }

        const testbook = await this.testbooksService.getTestbook(exam.testbook_id);
        const questions = testbook.questions;

        let submission = new this.submissionModel({
            exam_id: body.exam_id,
            created_at: new Date(),
            participant: body.participant,
            answers: body.answers,
            score: this.computeSubmissionScore(questions, body.answers),
            max_score: questions.length
        });

        try {
            const saved = await submission.save();

            return saved;
        } catch(e) {
            this.logger.error(`create(): DB error: ${e}`);
            throw new InternalServerErrorException(`Database write error.`);
        }
    }

    computeSubmissionScore(questions, user_answers) {
        let score = 0;

        user_answers.forEach(answer => {
            const question = questions.find(q => q._id.equals(answer.question_id));

            if (!question) {
                this.logger.warn(`computeSubmissionsScore(): question not found: ${answer.question_id}`);
                return;
            }

            const user_guess = answer.user_answer;
            const correct = question.correct;

            if (user_guess === correct) {
                score++;
            }
        });

        return score;
    }

    async getSubmissions() {
        try {
            const list = await this.submissionModel.find().sort({
                created_at: -1
            }).exec();

            return list;
        } catch(e) {
            this.logger.error(`getSubmissions() db error: ${e}`);
            throw new InternalServerErrorException(`Submissions database query error.`);
        }
    }
}
