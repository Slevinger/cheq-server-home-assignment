const express = require("express");

const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");

const env = require("./config/env").init();
const vastsRoutes = require("./modules/vasts/vasts.routes");

const errorHandler = require("./middlewares/errorHandler");
const notFoundMiddleware = require("./middlewares/notFound");

let server;

(async () => {
  try {
    app.use(cors());
    app.use(bodyParser.json());
    app.use("/health", (req, res) => {
      const message = {
        version: module.exports.version,
        message: "OK"
      };
      res.json(message);
    });

    app.use("/v1/vasts", vastsRoutes);
    app.use(notFoundMiddleware);
    app.use(errorHandler);
    server = app.listen(env.PORT, () => {
      console.info(`Start listening on port ${env.PORT}!`);
      console.info(`CHEQ API env: ${env.NODE_ENV}`);
      console.info(`Node version: ${process.version}`);
    });

    process.on("SIGTERM", async function() {
      console.log("SIGTERM signal received. shutting down gracefully");
      server.close(() => {
        console.log("Closed out remaining http connections");
        console.log("closed db connection");
        process.exit(0);
      });
    });
    console.log("All required components initialized successfully");
  } catch (error) {
    console.error("Failed initializing modules components", error);
    process.exit(1);
  }
})();

process.on("uncaughtException", e => {
  console.error("Unexpected server error", e);
  process.exit(1);
});
