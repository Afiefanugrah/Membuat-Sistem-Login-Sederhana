const express = require('express')
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


app.get('/', function (req, res) {
    res.json({
        data: "halo",
        metadata: "halaman awal"
    })
})

app.post('/register', function (req, res) {
    const {username, password} = req.body;
    let users = readUsersFromFile();
    users.push({username, password});
    writeUsersToFile(users);
    res.status(201).send('User added and saved successfully');

    
})

app.listen(port, () => {console.log(`Server running on port ${port}`)});