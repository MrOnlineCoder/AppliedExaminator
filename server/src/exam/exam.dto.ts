import { IsDefined, IsString, IsObject } from "class-validator";

export class ExamCreateDto {
    @IsDefined()
    @IsString()
    title: string
}

export class ExamSaveDto {
    @IsDefined()
    @IsObject()
    exam
}