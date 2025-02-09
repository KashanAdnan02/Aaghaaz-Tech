import Admission from '../models/registration.model.mjs';

// Create a new registration
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
            profilePicture,
            hasLaptop
        } = req.body;

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
            profilePicture,
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

// Get all registrations
export const getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Admission.find({});
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get single registration by ID
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

// Update registration
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

// Delete registration
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
