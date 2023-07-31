import express from 'express';
import router from './routes/index.route.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.SERVER_PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server online, running on port: ${PORT}`);
});