import { IsDefined, IsString, IsObject, IsArray } from "class-validator";

export class SubmissionAnswerDto {
    @IsDefined()
    @IsString()
    question_id: string

    @IsDefined()
    @IsString()
    user_answer: string
}

export class SubmissionSendDto {
    @IsDefined()
    @IsString()
    exam_id: string

    @IsDefined()
    @IsString()
    participant: string

    @IsArray()
    answers: SubmissionAnswerDto[]
}