import Admission from '../models/registration.model.mjs';
import { v2 as cloudinary } from 'cloudinary';

// Configure cloudinary
cloudinary.config({
    cloud_name: 'dxpqgnxob',
    api_key: '719765657819354',
    api_secret: "7ghUED-vntiP19Pr7_41Xm5ZFvA"
});

export const createRegistration = async (req, res) => {
    try {
        const {
            fullname,
            fathername,
            email,
            contactNumber,
            cnic,
            dateOfBirth,
            course,
            city,
            gender,
            hasLaptop
        } = req.body;

        // Validate required fields
        if (!fullname || !fathername || !email || !contactNumber || !cnic ||
            !dateOfBirth || !course || !city || !gender || !req.file) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        // Validate CNIC format (13 digits)
        const cnicRegex = /^\d{13}$/;
        if (!cnicRegex.test(cnic)) {
            return res.status(400).json({
                success: false,
                message: "CNIC must be 13 digits"
            });
        }

        // Validate contact number (11 digits)
        const contactRegex = /^\d{11}$/;
        if (!contactRegex.test(contactNumber)) {
            return res.status(400).json({
                success: false,
                message: "Contact number must be 11 digits"
            });
        }

        // Check if email already exists
        const existingEmail = await Admission.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Check if CNIC already exists
        const existingCNIC = await Admission.findOne({ cnic });
        if (existingCNIC) {
            return res.status(400).json({
                success: false,
                message: "CNIC already registered"
            });
        }

        // Upload image to cloudinary
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: 'student-profiles',
            width: 500,
            height: 500,
            crop: 'fill',
            gravity: 'face',
            fetch_format: 'auto',
            quality: 'auto'
        });

        const registration = await Admission.create({
            fullname,
            fathername,
            email,
            contactNumber,
            cnic,
            dateOfBirth,
            course,
            city,
            gender,
            profilePicture: uploadResult.secure_url,
            hasLaptop
        });

        if (!registration) {
            return res.status(400).json({
                success: false,
                message: "Error while creating registration!"
            });
        }

        res.status(201).json(registration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Admission.find({});
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getRegistration = async (req, res) => {
    try {
        const registration = await Admission.findById(req.params.id);

        if (!registration) {
            return res.status(404).json({ message: "Registration not found" });
        }

        res.status(200).json(registration);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateRegistration = async (req, res) => {
    try {
        const registration = await Admission.findById(req.params.id);

        if (!registration) {
            return res.status(404).json({ message: "Registration not found" });
        }

        const updatedRegistration = await Admission.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedRegistration);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteRegistration = async (req, res) => {
    try {
        const registration = await Admission.findById(req.params.id);

        if (!registration) {
            return res.status(404).json({ message: "Registration not found" });
        }

        await Admission.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Registration deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
