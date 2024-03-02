const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(uri);
        console.log(`Database connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
}

module.exports = connectDB;