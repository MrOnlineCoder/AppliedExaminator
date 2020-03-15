import * as mongoose from 'mongoose'

const ExamSchema = new mongoose.Schema({
    title: String,
    created_at: Date,
    starts_at: Date,
    status: {
        type: String,
        enum: ['preparing','running', 'finished'],
        default: 'preparing'
    },
    testbook_id: mongoose.SchemaTypes.ObjectId
});

export default ExamSchema;