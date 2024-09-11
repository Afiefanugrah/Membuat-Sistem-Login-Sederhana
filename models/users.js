const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: "Users"
});

module.exports = User;
