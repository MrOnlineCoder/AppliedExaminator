import { Controller, Get, Post, Body } from '@nestjs/common';
import { TestbooksService } from './testbooks.service';
import { TestbookCreateDto, TestbookSaveDto } from './testbooks.dto';

@Controller('testbooks')
export class TestbooksController {

    constructor(
        private readonly testbooksService: TestbooksService
    ) {

    }
    
    @Get('/all')
    async getAll() {
        return {
            testbooks: await this.testbooksService.getTestbooks()
        }
    }

    @Post('/create')
    async createTestbook(@Body() body: TestbookCreateDto) {
        const saved = await this.testbooksService.createTestbook(body);

        return {
            testbook: saved
        }
    }

    @Post('/save')
    async saveTestbook(@Body() body: TestbookSaveDto) {
        const saved = await this.testbooksService.updateTestbook(body.testbook);

        return {
            testbook: saved
        }
    }
}
