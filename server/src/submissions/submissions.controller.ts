import { Controller, Post, Body } from '@nestjs/common';
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
}
