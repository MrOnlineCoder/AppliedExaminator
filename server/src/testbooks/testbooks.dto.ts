import { IsString, IsDefined, IsObject} from 'class-validator'
import { Testbook } from './testbooks.interface'

export class TestbookCreateDto {
    @IsString()
    @IsDefined()
    title: string

    @IsString()
    @IsDefined()
    category: string
}

export class TestbookSaveDto {
    @IsObject()
    @IsDefined()
    testbook: Testbook
}