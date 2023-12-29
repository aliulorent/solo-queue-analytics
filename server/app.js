require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect()

app.get('/', (req, res) => {
    res.send("Welcome to my API!");
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})