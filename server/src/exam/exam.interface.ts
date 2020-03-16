import { Document } from "mongoose";

export interface Exam extends Document{
    title: string,
    created_at,
    started_at,
    finished_at,
    public: boolean,
    status: string,
    testbook_id: string
}