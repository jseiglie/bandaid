"use strict";
require("dotenv").config();
require("./models"); // necesario para cargar los modelos y sincronizar la base de datos
const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const path = require("path");
const cors = require("cors");
const sequelize = require("./config/index");
const cloudinary = require("cloudinary").v2;
const loadRoutes = require("./utils/loadRoutes");
//routes import

const webhookRoute = require("./routes/webhook.routes");

const app = express();
const server = createServer(app);
const router = express.Router();

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(express.static(path.join(__dirname, "./client/dist")));

//before express.json middleware we call webhooks
app.use("/api/webhook", webhookRoute);

//after webhooks we can use express.json middleware
app.use(express.json());

//router config
app.use("/api", router);
app.use("/api/test", (req, res) => {
  res.json({ message: "Hello from the server!" });
});
loadRoutes(app);

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "./client/dist/index.html"));
});

server.listen(3000, async () => {
  try {
    console.log("Connecting to the database...");

    await sequelize.authenticate();

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log("server running at http://localhost:3000");
});
