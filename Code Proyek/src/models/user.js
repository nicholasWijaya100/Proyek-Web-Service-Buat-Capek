const Sequelize  = require('sequelize');
const {getDB}   = require("../conn");
const sequelize = getDB(); 
const User = sequelize.define('user', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: Sequelize.STRING,
    },
    id_event: {
        type: Sequelize.STRING,
    },
    nama_event: {
        type: Sequelize.STRING,
    }
}, {
    tableName: 'users',
    timestamps: false
});
module.exports = (sequelize, Sequelize) => {
    return User; 
}