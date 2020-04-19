import * as mongoose from 'mongoose'

const SubmissionSchema = new mongoose.Schema({
    exam_id: String,
    created_at: Date,
    participant: String,
    answers: [{
        question_id: mongoose.SchemaTypes.ObjectId,
        user_answer: String
    }],
    score: Number,
    max_score: Number
});

export default SubmissionSchema;