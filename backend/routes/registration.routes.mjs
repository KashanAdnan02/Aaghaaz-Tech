import express from 'express';
import {
    createRegistration,
    getAllRegistrations,
    getRegistration,
    updateRegistration,
    deleteRegistration
} from '../controllers/registration.controller.mjs';

const router = express.Router();

router.post('/', createRegistration);
router.get('/', getAllRegistrations);
router.get('/:id', getRegistration);
router.put('/:id', updateRegistration);
router.delete('/:id', deleteRegistration);

export default router;
