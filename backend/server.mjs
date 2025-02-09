import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/students.routes.mjs';
import mongoose from 'mongoose';

// Connect to MongoDB
mongoose.connect('mongodb+srv://kasghazadtech1023403:kashanadnan02@aaghaaz-tech-database.bra7y.mongodb.net/aaghaaz-tech?retryWrites=true&w=majority&appName=aaghaaz-tech-database')
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
