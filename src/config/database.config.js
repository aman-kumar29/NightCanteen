import { connect, set } from 'mongoose';
import bcrypt from 'bcryptjs';
import { FoodModel } from '../models/food.model.js';
import { UserModel } from '../models/user.model.js';
import { sampleFoodData, sampleUsers } from '../data.js'; // Import both sample data arrays
import dotenv from 'dotenv';

dotenv.config();

set('strictQuery', true);

export const dbconnect = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
        await seedUsers();
        await seedFoods();
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
};

async function seedUsers() {
    try {
        const countUsers = await UserModel.countDocuments();
        if (countUsers > 0) {
            console.log("Already Seeded userModel---");
            return;
        }
        console.log(countUsers);

        for (let user of sampleUsers) {
            user.password = await bcrypt.hash(user.password, Number(process.env.PASSWORD_HASH_SALT_ROUNDS));
            await UserModel.create(user);
        }
        console.log("User Seeding Done Now!!");
    } catch (error) {
        console.error('Error seeding users:', error.message);
    }
}

async function seedFoods() {
    try {
        const countFoods = await FoodModel.countDocuments();
        if (countFoods > 0) {
            console.log("Already Seeded foodModel---");
            return;
        }

        for (let food of sampleFoodData) {
            food.imageURL= `/foods/${food.ImageURL}`;
            await FoodModel.create(food);
        }
        console.log("Food Seeding Done Now!!");
    } catch (error) {
        console.error('Error seeding foods:', error.message);
    }
}
