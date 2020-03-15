import { Document } from "mongoose";

export interface Exam extends Document{
    title: string,
    created_at: string,
    status: string,
    testbook_id: string
}