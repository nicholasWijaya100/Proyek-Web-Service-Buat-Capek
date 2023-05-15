const Sequelize = require('sequelize');
const config = require('../config/config.json');

const { host, username, password, port, database, dialect } = config.connection_db

const conn = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: dialect
})

module.exports = conn