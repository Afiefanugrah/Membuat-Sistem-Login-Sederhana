const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('db_login', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize