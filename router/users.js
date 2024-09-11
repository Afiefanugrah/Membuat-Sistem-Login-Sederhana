const express = require('express')
const router = express.Router()
const UserModel = require('../models/users')
const bcrypt = require('bcrypt') 

router.get('/', async (req, res) => {
    const users = await UserModel.findAll()
    res.status(200).json({
        data: users,
        metadata: "test endpoind"
    })
})

router.post('/', async (req, res) => {
    const { username, password } = req.body
    const encryptedPassword = await bcrypt.hash(password, 10)
    const users = await UserModel.create({
        username, password: encryptedPassword
    })
    if (users)
    res.status(200).json({
        data: users,
        metadata: "test endpoind"
    })
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const usersData = await UserModel.findOne({where: {username: username}})
    const compare = await bcrypt.compare(password, usersData.password)
    // res.json({compare})
    if (compare  === true) {
        res.status(200).json({
            data: usersData,
            metadata: "login sukses"
        })
    } else {
        res.status(400).json({
            error: "data invalid"
        })
    }
})



module.exports = router