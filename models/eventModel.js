import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name event tidak boleh kosong!'],
    },
    organizer: {
        type: String,
        required: [true, 'Organizer event tidak boleh kosong!'],
    },
    date: {
        type: String,
        required: [true, 'Date event tidak boleh kosong!'],
    },
    start_time: {
        type: String,
        // required: [true, 'Start time event tidak boleh kosong!'],
    },
    end_time: {
        type: String,
        // required: [true, 'End time event tidak boleh kosong!'],
    },
    location: {
        type: String,
        required: [true, 'Location event tidak boleh kosong!'],
    },
    ticket_status: {
        type: String,
        required: [true, 'Ticket status event tidak boleh kosong!'],
    },
    status: {
        type: String,
        required: [true, 'Status event tidak boleh kosong!'],
    },
    link: {
        type: String,
        required: [true, 'Link event tidak boleh kosong!'],
    },
    source: {
        type: String,
        // required: [true, 'Link source tidak boleh kosong!'],
    },
    poster: {
        type: String,
        required: [true, 'Poster event tidak boleh kosong!'],
    },
    category: {
        type: String,
        required: [true, 'Category event tidak boleh kosong!'],
    },
    description: {
        type: String,
        // required: [true, 'Description event tidak boleh kosong!'],
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

const Event = mongoose.model("Event", eventSchema)

export default Event;