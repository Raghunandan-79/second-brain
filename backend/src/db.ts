import "dotenv/config"
import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI!)

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const tagSchema = new Schema({
    title: { type: String, required: true },
});

const linkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
});

const contentTypes = ['image', 'video', 'article', 'audio', 'youtube', 'twitter'];

const contentSchema = new Schema({
    link: { type: String, unique: true, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: Types.ObjectId, ref: 'tags' }],
    userId: { type: Types.ObjectId, ref: 'users', required: true },
});

export const UserModel = mongoose.model('users', userSchema);
export const TagModel = mongoose.model('tags', tagSchema);
export const LinkModel = mongoose.model('link', linkSchema);
export const ContentModel = mongoose.model('content', contentSchema);