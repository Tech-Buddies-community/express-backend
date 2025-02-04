import mongoose from "mongoose";

const { Schema } = mongoose;

const beasiswaSchema = new Schema({ 
    name: {
        type: String,
        required: [true, 'Name beasiswa tidak boleh kosong!'],
    },
    organizer: {
        type: String,
        required: [true, 'Organizer beasiswa tidak boleh kosong!'],
    },
    deadline_registration: {
        type: String,
        required: [true, 'Deadline registration beasiswa tidak boleh kosong!'],
    },
    location: {
        type: String,
        required: [true, 'Location beasiswa tidak boleh kosong!'],
    },
    ticket_status: {
        type: String,
        required: [true, 'Ticket status beasiswa tidak boleh kosong!'],
    },
    status: {
        type: String,
        required: [true, 'Status beasiswa tidak boleh kosong!'],
    },
    information: {
        type: String,
        required: [true, 'Information beasiswa tidak boleh kosong!'],
    },
    registration: {
        type: String,
        required: [true, 'Registratiin beasiswa tidak boleh kosong!'],
    },
    poster: {
        type: String,
        required: [true, 'Poster beasiswa tidak boleh kosong!'],
    },
    description: {
        type: String,
        required: [true, 'Description beasiswa tidak boleh kosong!'],
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

const Beasiswa = mongoose.model("Beasiswa", beasiswaSchema);

export default Beasiswa;