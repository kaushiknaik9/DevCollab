const express = require("express");

const app = express();

const projrouter = require("./src/routes/projects");

const logger = require("./src/middleware/loggermiddleware");
const validate = require("./src/middleware/validate");
const requestId = require("./src/middleware/requestId");
const errorHandler = require("./src/middleware/errorHandler");

app.use(logger);
app.use(requestId);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(validate());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server HealthChack Route !! ",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/projects", projrouter);

app.use(errorHandler);

module.exports = app;
