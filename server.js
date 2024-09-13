const express = require('express')
const port = 3200

const app = express()

app.use(express.json())

let usersData = []


app.get('/', function (req, res) {
    res.json({
        data: "halo",
        metadata: "halaman awal"
    })
})

app.post('/', function (req, res) {
    const { username, password } = req.body
    console.log('Request body:', req.body); // Debugging

    if (!username || !password) {
        return res.status(400).json({ error: 'Username atau password tidak ada!' });
    }

    // Simpan data pengguna ke dalam array
    usersData.push({ username, password });
    res.json({
        data: username,
        usersData: usersData,
        metadata: "halaman awal"
    })
})

app.listen(port, () => {console.log(`Server running on port ${port}`)});