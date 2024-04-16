require("dotenv").config();
require("./api/strategies/locals");

//Dependencies
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
// const socketIo = require("socket.io");
const { Server } = require("socket.io");
const cron = require("node-cron");

//Middleware for Database
const connectDB = require("./api/config/db");

//Route Modules
const userRouter = require("./api/routes/userRouter");
const authRouter = require("./api/routes/authRouter");
const buildingRouter = require("./api/routes/buildingRouter");
const visitorRouter = require("./api/routes/visitorRouter");
const visitorLogsRouter = require("./api/routes/visitorLogsRouter");
const badgeRouter = require("./api/routes/badgeRouter");
const eventsRouter = require("./api/routes/eventsRouter");
const announcementsRouter = require("./api/routes/announcementsRouter");
const notificationRouter = require("./api/routes/notificationRouter");
const systemLogRouter = require('./api/routes/systemLogRouter');
const officesRouter = require('./api/routes/officesRouter');
const employeesRouter = require('./api/routes/employeesRouter');
const reasonRouter = require('./api/routes/reasonRouter');
const ocrRouter = require('./api/routes/ocrRouter');
const { timeInReminder, timeOutReminder } = require("./api/utils/helper");

// Create Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.set("io", io);

// Configure app
app.use(cors());
app.use(bodyParser.json({ limit: "5mb" })); // Increase the limit to 5mb (adjust as needed)
app.use(passport.initialize());
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Connect to database
connectDB();

// Routes
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/buildings", buildingRouter);
app.use("/visitor", visitorRouter);
app.use("/visitor/logs", visitorLogsRouter);
app.use("/visitor/companion/logs", visitorLogsRouter);
app.use("/badge", badgeRouter);
app.use("/events", eventsRouter);
app.use("/announcements", announcementsRouter);
app.use("/notification", notificationRouter);
app.use("/system-logs", systemLogRouter);
app.use('/offices', officesRouter);
app.use('/employees', employeesRouter);
app.use('/reasons', reasonRouter);
app.use('/scan', ocrRouter);

// Socket.io events
// io.on("connection", (socket) => {
//   console.log(`Client: ${socket.id} connected!`);

//   socket.on("disconnect", () => {
//     console.log(`Client: ${socket.id} disconnected`);
//   });
// });

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// change to */5 * * * * * for testing every 5 mins
// 0 * * * * to every hour

cron.schedule(
  "0 * * * *",
  async () => {
    await timeOutReminder(io);
    await timeInReminder(io);
  },
  {
    scheduled: true,
    timezone: "Asia/Manila",
  }
);
