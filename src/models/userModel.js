import mongoose from "mongoose";
import bcrycrpt from 'bcryptjs';
import validator from 'validator';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name tidak boleh kosong!'],
        unique: [true, 'Username already exist!']
    },
    email: {
        type: String,
        required: [true, 'Email tidak boleh kosong!'],
        unique: [true, 'Email already exist!'],
        validate: {
            validator: validator.isEmail,
            message: 'Email must foo@mail.com!'
        }
    },
    password: {
        type: String,
        required: [true, 'Password tidak boleh kosong!'],
        minLength: [8, 'Password min 8 Character!']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }, 
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    deleted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    deleted_at: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

userSchema.pre('save', async function(){
    const salt = await bcrycrpt.genSalt(10)
    this.password = await bcrycrpt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function (reqBody) {
    return await bcrycrpt.compare(reqBody, this.password)
}

const User = mongoose.model("User", userSchema)

export default User;