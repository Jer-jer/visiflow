require("dotenv").config();
require("./api/strategies/locals");

const express = require("express");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const createSession = require("./api/utils/sessionHelper");

const connectDB = require("./api/config/db");

const app = express();

app.use(cors());
app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(createSession);
app.use(passport.initialize());
// app.use(passport.session());

connectDB();

app.use('/user', require('./api/routes/userRouter'));
app.use('/auth', require('./api/routes/authRouter'));
app.use('/buildings', require('./api/routes/buildingRouter'));
app.use('/visitor', require('./api/routes/visitorRouter'));
app.use('/visitor/logs', require('./api/routes/visitorLogsRouter'));
app.use('/visitor/companion/logs', require('./api/routes/visitorLogsRouter'));
app.use('/badge', require('./api/routes/badgeRouter'));
app.use('/events',require('./api/routes/eventsRouter'));
//Homepage Related Links
app.use('/announcements', require('./api/routes/announcementsRouter'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
