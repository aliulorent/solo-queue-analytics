import dotenv from "dotenv";
import axios from "axios";
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const regionMap = {
    "NA1":"Americas",
    "BR1":"Americas",
    "LA1":"Americas",
    "LA2":"Americas",
    "JP1":"Asia",
    "KR":"Asia",
    "EUN1":"Europe",
    "EUW1":"Europe",
    "TR1":"Europe",
    "RU":"Europe",
    "OC1":"Sea",
    "PH2":"Sea",
    "SG2":"Sea",
    "TH2":"Sea",
    "TW2":"Sea",
    "VN2":"Sea",
};

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;
const riotKey = process.env.RIOT_KEY;

const connection = await mysql.createConnection(process.env.DATABASE_URL);
app.use(cors({
    origin: '*'
}))

app.get('/', (req, res) => {
    res.send("Welcome to my API!");
});

app.get('/getSummoner/:region/:name/:tag', async (req, res) => {
    const query = `SELECT * FROM users WHERE riot_name = ? AND tag_line = ? AND region = ?`;
    try{
        const [rows, fields] = await connection.query(query, [req.params.name, req.params.tag, req.params.region]);
        if(rows.length>0){
            // Player exists in our DB, we dont need to force search the Riot API and can quick send our last update.
            res.status(200).send(rows[0]);
        }
        else{
            // Player doesn't exist in our DB, we need to search Riot API to see if player exists.
            const puuidResponse = await axios.get(`https://${regionMap[req.params.region.toUpperCase()]}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${req.params.name}/${req.params.tag}?api_key=${riotKey}`);
            const puuid = puuidResponse.data.puuid;
            const summonerResponse = await axios.get(`https://${req.params.region.toUpperCase()}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${riotKey}`);
            // After fetching updated data, need to store it in DB for future searches.
            const data = summonerResponse.data;
            const query2 = `INSERT INTO users (puuid, riot_name, tag_line, region, account_id, summoner_id, level, icon_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const [results] = await connection.query(query2, [puuid, req.params.name, req.params.tag, req.params.region, data.accountId, data.id, data.summonerLevel, data.profileIconId]);
            // Insert queries don't return the rows inserted, so we need to query it again to retrieve it!
            const [rows2, fields2] = await connection.query(query, [req.params.name, req.params.tag, req.params.region]);
            if(rows2.length>0){
                res.status(200).send(rows2[0]);
            }
            else{
                throw new Error("Query somehow did not find user.");
            }
        }
    }
    catch(error){
        if(error.response){
            console.log(error.response.status);
            res.status(error.response.status).send("Error");
        }
        else{
            res.status(500).send("Something unexpected happened... Please try again later.");
        }
    }
});



app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});