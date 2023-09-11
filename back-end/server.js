require('dotenv').config();

const express = require('express');

const connectDB = require('./api/config/db');

const app = express();
const PORT = 5000 || process.env.PORT;

connectDB();

app.use('/user', require('./api/routes/users'));

app.listen(PORT, () => {
    console.log("Server started on port ${PORT}");
})

