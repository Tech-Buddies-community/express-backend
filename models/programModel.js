import mongoose from "mongoose";

const { Schema } = mongoose;

const programSchema = new Schema({ 
    name: {
        type: String,
        required: [true, 'Name program tidak boleh kosong!'],
    },
    organizer: {
        type: String,
        required: [true, 'Organizer program tidak boleh kosong!'],
    },
    deadline_registration: {
        type: String,
        required: [true, 'Deadline registration program tidak boleh kosong!'],
    },
    location: {
        type: String,
        // required: [true, 'Location program tidak boleh kosong!'],
    },
    ticket_status: {
        type: String,
        required: [true, 'Ticket status program tidak boleh kosong!'],
    },
    status: {
        type: String,
        required: [true, 'Status program tidak boleh kosong!'],
    },
    information: {
        type: String,
        // required: [true, 'Information program tidak boleh kosong!'],
    },
    registration: {
        type: String,
        // required: [true, 'Registratiin program tidak boleh kosong!'],
    },
    poster: {
        type: String,
        required: [true, 'Poster program tidak boleh kosong!'],
    },
    description: {
        type: String,
        // required: [true, 'Description program tidak boleh kosong!'],
    },
    created_at: {
        type: Date,
        default: Date.now,
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
        default: Date.now,
    }
},{ timestamps: true });

const Program = mongoose.model("Program", programSchema);

export default Program;