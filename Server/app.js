// Imports
const express = require("express");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const cors = require("cors");
// Routers
const userRouter = require("./routers/userRouter");
const programRouter = require("./routers/programRouter");
const contactRouter = require("./routers/contactRouter");
const eligibilityRouter = require("./routers/eligibilityRouter");

process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
  process.exit(1); // Exit the process or handle it as per your application's requirements
});

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));
app.use(express.json());


app.use("/api/users", userRouter);
app.use("/api/programs", programRouter);
app.use("/api/contact", contactRouter);
app.use("/api/eligibility", eligibilityRouter);
app.all("*", (req, res, next) => {
  const err = new AppError(
    `Sorry the ${req.originalUrl} route for ${req.httpVersion} is not defined for this server`,
    404
  );
  next(err);
});
app.use(globalErrorHandler); // All route definitions need to come before this middleware, which automatically handles remaining errors
module.exports = app;
