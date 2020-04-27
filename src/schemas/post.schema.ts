import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
    title:      { type: String, required: true, unique: true },
    url:        { type: String, required: true, unique: true, lowercase: true},
    content:    { type: String, required: true },
    image:      { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

export default model('Post', PostSchema);