import * as mongoose from 'mongoose'

const QuestionSchema = new mongoose.Schema({
    task: String,
    answers: [String],
    correct: String
});

const TestbookSchema = new mongoose.Schema({
    title: String,
    category: String,
    created_at: Date,
    questions: [QuestionSchema]
});

export default TestbookSchema;