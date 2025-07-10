const Sequelize = require("sequelize");
const config = require("./db.config")
require("dotenv").config();


module.exports = new Sequelize(config.database, config.user, config.pass,  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: process.env.PRODUCTION == 0 ? console.log : false,
    

    dialectOptions:{
        //timezone: "UTC"
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }, 
})