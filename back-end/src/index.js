import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';  // Importing CORS middleware
import connection from './config/db.js';
import apiRouter from './routes/APiRouter.js';
import cookieParser from 'cookie-parser';  // Correctly using cookie-parser

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',  // Frontend URL (make sure to change it in production)
    credentials: true, // Allows cookies to be sent with requests
};

app.use(cors(corsOptions));  // Apply CORS configuration

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.send({ message: 'Hello' });
});

app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT);
    connection();
});
