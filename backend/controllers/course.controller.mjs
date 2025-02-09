import Course from '../models/course.model.mjs';

// Create a new course
export const createCourse = async (req, res) => {
    try {
        const { courseName, duration, courseFee, monthlyOnly, timings, active } = req.body;

        const courseExists = await Course.findOne({ courseName });
        if (courseExists) {
            return res.status(400).json({ message: "Course already exists" });
        }

        const course = await Course.create({
            courseName,
            duration,
            courseFee,
            monthlyOnly,
            timings,
            active
        });

        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Error while creating course!"
            });
        }

        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all courses
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get single course by ID
export const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update course
export const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete course
export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        await Course.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
