const env = require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const fs = require("fs");

// Initialize Sequelize
const sequelize = require("../config/index");
sequelize.Sequelize = Sequelize;

// Load all models
const models = {};
const imports = fs.readdirSync("./models");

imports
  .filter((name) => name !== "index.js")
  .forEach((file) => {    
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    models[model.name] = model;
  });
console.log("Models loaded:", models);
// Setup model associations
Object.values(models).forEach((model) => {    
  if (model.associate) {
    model.associate(models);
  }
});

// Sync database
console.log("Syncing database...");

sequelize
  .sync({
    //force: process.env.ENV === "dev" ? true : false,
    alter: process.env.ENV === "dev" ? true : false,
  }
  )
  .then(async () => {
    console.log("Database synchronized!");
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.log("Unable to connect to the database:", error);
    }
  })
  .catch((error) => console.log("Error syncing database:", error));

module.exports = models;