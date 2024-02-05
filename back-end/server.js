require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./api/config/db');

const app = express();

app.use(cors());

const PORT = 5000 || process.env.PORT;

connectDB();

// //? User Related and Authentication Links
app.use('/user', require('./api/routes/userRouter'));
app.use('/auth', require('./api/routes/authRouter'));
//app.use('/visitor', require('./api/routes/visitorRouter'));
app.use('/bldgLoc', require('./api/routes/buildingLocRouter'));

// //? Visitor Related Links
//app.use('/visitor', require('./api/routes/visitorRouter'));
app.use('/visitor/companion', require('./api/routes/visitorCompRouter'));
app.use('/visitor/logs', require('./api/routes/visitorLogsRouter'));
app.use('/visitor/companion/logs', require('./api/routes/visitorLogsRouter'));

//Events Related Links
app.use('/events',require('./api/routes/eventsRouter'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
