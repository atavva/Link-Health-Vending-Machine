// Imports
const express = require("express");
const cors = require('cors');
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

// Routers
const userRouter = require("./routers/userRouter");
const programRouter = require("./routers/programRouter");
const contactRouter = require("./routers/contactRouter");
const eligibilityRouter = require("./routers/eligibilityRouter");

const app = express();

// Middleware
app.use(cors());
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
