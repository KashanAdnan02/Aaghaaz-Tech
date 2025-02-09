import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Student from '../models/student.model.mjs';

const generateToken = (id) => {
    return jwt.sign({ id }, "secretco3203302#$0", {
        expiresIn: '3h'
    });
};

export const register = async (req, res) => {
    try {
        const { fullname, email, gender, dateOfBirth, password } = req.body;
        const userExists = await Student.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(11);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await Student.create({
            fullname,
            email,
            gender,
            dateOfBirth,
            password: hashedPassword
        });

        if (!user) {
            return res.json({
                success: false,
                message: "Error while creating student profile!"
            })
        }

        res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
            token: generateToken(user._id)
        });

        res.cookie("token", generateToken(user._id), {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 3 * 24 * 60 * 60 * 1000
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await Student.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({}).select('-password');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).select('-password');

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        ).select('-password');

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

