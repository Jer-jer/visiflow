require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./api/config/db');

const app = express();

//use cors middleware
app.use(cors());

const PORT = 5000 || process.env.PORT;

connectDB();

app.use('/user', require('./api/routes/userRouters'));

app.listen(PORT, () => {
    console.log("Server started on port ${PORT}");
})
