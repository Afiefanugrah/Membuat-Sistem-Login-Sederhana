const { error } = require('console')
const express = require('express')
const byrcyt = require('bcrypt')
const fs = require('fs')
const FilePath = './users.json'
const port = 3200

const app = express()
app.use(express.json())

const readUsersFromFile = () => {
    try {
        const data = fs.readFileSync(FilePath, 'utf-8'); // Membaca file dengan encoding 'utf-8'
        return JSON.parse(data); // Mengubah data JSON yang dibaca menjadi objek JavaScript
    } catch (error) {
        return []; // Jika ada kesalahan (misal file tidak ditemukan), return array kosong
    }
};

const writeUsersToFile = (users) => {
    fs.writeFileSync(FilePath, JSON.stringify(users, null, 2)); // Menulis data ke file dengan format JSON
};


app.get('/', async (req, res) => {
    let users = readUsersFromFile();
    res.json({
        data: users,
        metadata: "halaman awal"
    })
})

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    const byrcyt = await byrcyt.hash(password, 10)
    let users = readUsersFromFile();
    const newUser = {username, password: byrcyt}
    users.push(newUser);
    writeUsersToFile(users);
    res.status(201).json({
        data: newUser,
        metadata: "add user success"
    })
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body
    let users = readUsersFromFile()
    const user = users.find(user => user.username === username && user.password === password)
    if(user) {
        res.status(200).json({
            data: user,
            metadata: "login success"
        })
    } else {
        res.status(401).json({
            error: "data invalid"
        })
        res
    }
})


app.listen(port, () => {console.log(`Server running on port ${port}`)});