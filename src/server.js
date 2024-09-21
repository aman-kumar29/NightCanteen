import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import foodRouter from './routers/food.router.js';
import userRouter from './routers/user.router.js';
import orderRouter from './routers/order.router.js'
import { dbconnect } from './config/database.config.js';
// import path from 'path';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// import cron from 'node-cron'; // Add cron job for periodic health checks
// import axios from 'axios'; // For making HTTP requests

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

dotenv.config();

dbconnect();

const app = express();
app.use(express.json());
app.use(
    cors(
        {
            credentials : true,
            origin:['http://127.0.0.1:3000','http://localhost:3000'],
        }
    )
);

app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
const PORT = process.env.PORT || 5000;

// Serve static assets in production
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

// Cron job to ping the server every 10 minutes
// cron.schedule('*/10 * * * *', async () => {
//   try {
//     const response = await axios.get(`http://localhost:${PORT}/api/health`);
//     console.log('Health check successful:', response.data);
//   } catch (error) {
//     console.error('Health check failed:', error.message);
//   }
// });

// // Create a health check endpoint
// app.get('/api/health', (req, res) => {
//   res.status(200).send('Server is healthy');
// });

app.listen(
    PORT, ()=> {
        console.log("Listening on Port ", PORT);
    }
);
