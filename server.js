const express = require('express')
const cors = require('cors')
const port = 3100

const sequelize = require('./db.config')
sequelize.sync().then(() => console.log("database ready"))

const userEnpoint = require('./router/users')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/users', userEnpoint)

app.listen(port, () => console.log(`running server on port ${port}`))
