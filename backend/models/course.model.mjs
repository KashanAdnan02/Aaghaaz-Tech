import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: String,
        required: true,
        trim: true
    },
    courseFee: {
        type: Number,
        required: true
    },
    monthlyOnly: {
        type: Boolean,
        required: true,
        default: false
    },
    timings: {
        type: Array,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
});

const Course = mongoose.model('Courses', courseSchema);

export default Course;
