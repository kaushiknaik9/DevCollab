const express = require("express");

const app = express();

const logger = require("./src/middleware/loggermiddleware");
const validate = require("./src/middleware/validate");
const requestId = require("./src/middleware/requestId");

app.use(logger);
app.use(requestId);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(validate());

app.use();

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server HealthChack Route !! ",
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: { message: `Error Occured During ${req.method}: ${req.url}` },
  });
});

module.exports = app;
