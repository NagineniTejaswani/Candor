import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
// routes

import authRoutes from './routes/auth.js';
import entryRoutes from './routes/entries.js';
import connectDB from './config/connectDB.js';
import aiRoutes from './routes/ai.js';

const app = express();

//Middleware
app.use(cors({origin : ["http://localhost:5173", process.env.CLIENT_URL].filter(Boolean), credentials: true}));
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/ai', aiRoutes);

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
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});