import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const tagSchema = new Schema({
    title: { type: String, required: true },
});

const linkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const contentTypes = ['image', 'video', 'article', 'audio'];

const contentSchema = new Schema({
    link: { type: String, unique: true, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: Types.ObjectId, ref: 'Tag' }],
    userId: { type: Types.ObjectId, ref: 'User', required: true },
});

export const UserModel = mongoose.model('users', userSchema);
export const tagModel = mongoose.model('tags', tagSchema);
export const linkModel = mongoose.model('link', linkSchema);
export const contentModel = mongoose.model('content', contentSchema);