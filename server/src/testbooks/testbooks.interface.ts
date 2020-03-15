import { Document } from 'mongoose'

export interface Question extends Document {
    task: string,
    answers: string[]
};

export interface Testbook extends Document {
    title: string
    category: string
    created_at: Date | Number | String,
    questions: Question[]
};