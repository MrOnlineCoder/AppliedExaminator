import { Document } from "mongoose";

export interface Submission extends Document {
    exam_id: string,
    participant: string,
    created_at,
    answers,
    score: number,
    max_score: number
}