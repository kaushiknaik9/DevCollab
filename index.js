require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Devcollab Server  Started !! \nPORT: ${PORT}`);
});

// Ctrl + C Handles
process.on("SIGINT", () => {
  console.log("\n Shutting down the Server Grafully");
  server.close(() => {
    console.log("Server Closed !! ");
    process.exit(0);
  });
});

//Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION: ", err);
  process.exit(1);
});
