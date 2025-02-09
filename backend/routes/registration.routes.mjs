import express from 'express';
import {
    createRegistration,
    getAllRegistrations,
    getRegistration,
    updateRegistration,
    deleteRegistration
} from '../controllers/registration.controller.mjs';
import upload from '../utils/multer.mjs';

const router = express.Router();

router.post('/', upload.single('profilePicture'), createRegistration);
router.get('/', getAllRegistrations);
router.get('/:id', getRegistration);
router.put('/:id', updateRegistration);
router.delete('/:id', deleteRegistration);

export default router;
