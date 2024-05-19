import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import foodRouter from './routers/food.router.js';
import userRouter from './routers/user.router.js';
import orderRouter from './routers/order.router.js'
import { dbconnect } from './config/database.config.js';
dotenv.config();

dbconnect();


const app = express();
app.use(express.json());
app.use(
    cors(
        {
            credentials : true,
            origin:['http://127.0.0.1:3000'],
        }
    )
);
app.get('/', (req,res)=>{
    res.send("Bakend server is up---");
})

app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
const PORT = process.env.PORT || 5000;
// Serve static assets in production
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
app.listen(
    PORT, ()=>{
        console.log("Listening on Port ", PORT);
    }
)