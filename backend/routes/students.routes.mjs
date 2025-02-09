import express from 'express';
import { register, login, getAllStudents, getStudent, updateStudent, deleteStudent } from '../controllers/student.controller.mjs';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', getAllStudents);
router.get('/:id', getStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;