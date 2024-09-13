const express = require('express')
const port = 3200

const app = express()


app.get('/', function (req, res) {
    res.json({
        data: "halo",
        metadata: "halaman awal"
    })
})

app.listen(port, () => {console.log(`Server running on port ${port}`)});