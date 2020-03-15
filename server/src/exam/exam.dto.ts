import { IsDefined, IsString } from "class-validator";

export class ExamCreateDto {
    @IsDefined()
    @IsString()
    title: string
}