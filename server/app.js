import dotenv from "dotenv";
import axios from "axios";
import express from "express";
import mysql from "mysql2/promise";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;
const riotKey = process.env.RIOT_KEY;

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// connection.connect();

app.get('/', (req, res) => {
    res.send("Welcome to my API!");
})

app.get('/getSummoner/:region/:name/:tag', async (req, res) => {
    const query = `SELECT * FROM users WHERE riot_name = ? AND tag_line = ? AND region = ?`;
    const [rows] = await connection.query(query, [req.params.name, req.params.tag, req.params.region]);
    res.send(rows);
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})