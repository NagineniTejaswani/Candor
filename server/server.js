import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();



const app = express();

//Middleware
app.use(cors({origin : "http://localhost:5173"}));
app.use(express.json());

// routes
import authRoutes from './routes/auth.js';
import entryRoutes from './routes/entries.js';
import connectDB from './config/connectDB.js';
app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);

//health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'API is healthy' });
});

// central error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});