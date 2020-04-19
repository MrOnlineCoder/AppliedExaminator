import { Controller, Post, Body, Get } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionSendDto } from './submissions.dto';

@Controller('submissions')
export class SubmissionsController {

    constructor(
        private readonly submissionsService: SubmissionsService
    ) {

    }

    @Post('/send')
    async sendSubmission(@Body() body : SubmissionSendDto) {
        await this.submissionsService.create(body);

        return {
            success: true
        }
    }

    @Get('/all')
    async getAll() {
        return {
            submissions: await this.submissionsService.getSubmissions()
        }
    }
}
