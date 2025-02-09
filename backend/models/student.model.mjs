import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "other"
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
