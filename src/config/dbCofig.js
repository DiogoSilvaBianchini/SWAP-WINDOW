require("dotenv").config()
const Sequelize = require("sequelize")
const oracledb = require("oracledb")

oracledb.initOracleClient({libDir: "C:/app/instantclient_23_7"})
const { DB_HOST, DB_PORT, DB_SERVICE, DB_DATABASE, DB_USER, DB_PASSWORD} = process.env
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "oracle",
    dialectModule: require("oracledb"),
    dialectOptions: {
        connectString: `${DB_HOST}:${DB_PORT}/${DB_SERVICE}`, 
    },
    logging: false
})

module.exports = sequelize