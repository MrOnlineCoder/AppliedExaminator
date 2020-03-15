import * as mongoose from 'mongoose'

import { v4 as uuidv4 } from 'uuid';

const ExamSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    title: String,
    created_at: Date,
    public: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['preparing','running', 'finished'],
        default: 'preparing'
    },
    testbook_id: mongoose.SchemaTypes.ObjectId
});

export default ExamSchema;