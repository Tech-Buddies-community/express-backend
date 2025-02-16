import mongoose from "mongoose";

const { Schema } = mongoose;

const jobSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name job tidak boleh kosong!'],
    },
    organizer: {
        type: String,
        required: [true, 'Organizer job tidak boleh kosong!'],
    },
    link: {
        type: String,
        required: [true, 'Link job tidak boleh kosong!'],
    },
    poster: {
        type: String,
        required: [true, 'Poster job tidak boleh kosong!'],
    },
    position: {
        type: String,
        required: [true, 'Position job tidak boleh kosong!'],
    },
    category: {
        type: String,
        required: [true, 'Category job tidak boleh kosong!'],
    },
    description: {
        type: String,
        required: [true, 'Description job tidak boleh kosong!'],
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    created_by: {
        type: Schema.ObjectId,
        ref: 'User',
        default: null
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    updated_by: {
        type: Schema.ObjectId,
        ref: 'User',
        default: null
    },
    deleted_by: {
        type: Schema.ObjectId,
        ref: 'User',
        default: null
    },
    deleted_at: {
        type: Date,
        default: Date.now
    }
},{ timestamps: true });

const Job = mongoose.model("Job", jobSchema)

export default Job;