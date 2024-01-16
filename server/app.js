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
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;
const riotKey = process.env.RIOT_KEY;

const connection = await mysql.createConnection(process.env.DATABASE_URL);
app.use(cors({
    origin: 'https://solo-queue-analytics.netlify.app'
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
            const query2 = `INSERT INTO users (puuid, riot_name, tag_line, region, account_id, summoner_id, level, icon_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE riot_name=?, tag_line=?, region=?, account_id=?, summoner_id=?, level=?, icon_id=?`;
            const [results] = await connection.query(query2, [puuid, puuidResponse.data.gameName, puuidResponse.data.tagLine, req.params.region, data.accountId, data.id, data.summonerLevel, data.profileIconId, puuidResponse.data.gameName, puuidResponse.data.tagLine, req.params.region, data.accountId, data.id, data.summonerLevel, data.profileIconId]);
            // Insert queries don't return the rows inserted, so we need to query it again to retrieve it!
            const [rows2, fields2] = await connection.query(query, [puuidResponse.data.gameName, puuidResponse.data.tagLine, req.params.region]);
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
            //console.log(error.response.status);
            res.status(error.response.status).send("Error");
        }
        else{
            res.status(500).send("Something unexpected happened... Please try again later.");
        }
    }
});

app.put('/updateSummoner/:region/:name/:tag', async (req, res)=>{
    try{
        const query = `SELECT * FROM users WHERE riot_name = ? AND tag_line = ? AND region = ?`;
        const puuidResponse = await axios.get(`https://${regionMap[req.params.region.toUpperCase()]}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${req.params.name}/${req.params.tag}?api_key=${riotKey}`);
        const puuid = puuidResponse.data.puuid;
        const summonerResponse = await axios.get(`https://${req.params.region.toUpperCase()}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${riotKey}`);
        const data = summonerResponse.data;
        const query2 = `INSERT INTO users (puuid, riot_name, tag_line, region, account_id, summoner_id, level, icon_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE riot_name=?, tag_line=?, region=?, account_id=?, summoner_id=?, level=?, icon_id=?`;
        const [results] = await connection.query(query2, [puuid, puuidResponse.data.gameName, puuidResponse.data.tagLine, req.params.region, data.accountId, data.id, data.summonerLevel, data.profileIconId, puuidResponse.data.gameName, puuidResponse.data.tagLine, req.params.region, data.accountId, data.id, data.summonerLevel, data.profileIconId]);
        // Insert queries don't return the rows inserted, so we need to query it again to retrieve it!
        const [rows2, fields2] = await connection.query(query, [puuidResponse.data.gameName, puuidResponse.data.tagLine, req.params.region]);
        if(rows2.length>0){
            res.status(200).send(rows2[0]);
        }
        else{
            throw new Error("Query somehow did not find user.");
        }
    }
    catch(error){
        if(error.response){
            //console.log(error.response.status);
            res.status(error.response.status).send("Error");
        }
        else{
            res.status(500).send("Something unexpected happened... Please try again later.");
        }
    }
});

app.put("/updateMatchHistory/:region/:puuid", async (req, res)=>{
    const queue = 420;
    const count = 20;
    const offset = 0;
    try{
        // Manually update match history, so need to search through Riot's API
        const matchList = await axios.get(`https://${regionMap[req.params.region.toUpperCase()]}.api.riotgames.com/lol/match/v5/matches/by-puuid/${req.params.puuid}/ids?queue=${queue}&start=${offset}&count=${count}&api_key=${riotKey}`);
        // Want to try and concurrently fetch all match data at same time (about 20 matches)
        // Riot API rate limits to 20 request per second, and since we have 20 matches, we need to wait a second otherwise we will limit ourselves.
        await sleep(1000);
        let promiseList = [];
        matchList.data.forEach(matchId => {
            promiseList.push(axios.get(`https://${regionMap[req.params.region.toUpperCase()]}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${riotKey}`));
        });
        const resolvedList = await Promise.all(promiseList);
        const matches = resolvedList.map(entry => entry.data);
        // new up-to-date list of matches, insert them into our DB now.
        const query = `INSERT INTO match_history (puuid, matches) VALUES (?, ?) ON DUPLICATE KEY UPDATE matches=?`;
        const [results] = await connection.query(query, [req.params.puuid, JSON.stringify(matches), JSON.stringify(matches)]);
        // Insert queries dont return the rows we inserted, so lets search for them.
        const query2 = `SELECT * FROM match_history WHERE puuid=?`;
        const [rows, fields] = await connection.query(query2, [req.params.puuid]);
        if(rows.length>0){
            res.status(200).send(rows[0]);
        }
        else{
            res.status(200).send("Not found");
        }
    }
    catch(error){
        if(error.response){
            res.status(error.response.status).send(error);
        }
        else{
            //console.log(error);
            res.status(500).send("Something unexpected happened... Please try again later.");
        }
    }
});

app.get('/getMatchHistory/:puuid', async (req, res)=>{
    try{
        const query = `SELECT * FROM match_history WHERE puuid=?`;
        const [rows, fields] = await connection.query(query, [req.params.puuid]);
        if(rows.length>0){
            res.status(200).send(rows[0]);
        }
        else{
            res.status(200).send("Not found");
        }
    }
    catch(error){
        if(error.response){
            res.status(error.response.status).send("Error");
        }
        else{
            res.status(500).send("Something unexpected happened... Please try again later.");
        }
    }
});

app.put('/updateRankedStats/:region/:summonerId/:puuid', async (req, res)=>{
    try{
        const rankedResponse = await axios.get(`https://${req.params.region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${req.params.summonerId}?api_key=${riotKey}`);
        // Some players have ONLY soloQ games, or ONLY flexQ games, or NEITHER. Need to filter based on that.
        const [soloRanked] = rankedResponse.data.filter((type)=>type.queueType==="RANKED_SOLO_5x5");
        const [flexRanked] = rankedResponse.data.filter((type)=>type.queueType==="RANKED_FLEX_SR");
        if(soloRanked){
            const soloQuery = `INSERT INTO ranked_stats (puuid, solo_tier, solo_rank, solo_lp, solo_wins, solo_losses) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE solo_tier=?, solo_rank=?, solo_lp=?, solo_wins=?, solo_losses=?`;
            const [results] = await connection.query(soloQuery, [req.params.puuid, soloRanked.tier, soloRanked.rank, soloRanked.leaguePoints, soloRanked.wins, soloRanked.losses, soloRanked.tier, soloRanked.rank, soloRanked.leaguePoints, soloRanked.wins, soloRanked.losses]);
        }
        if(flexRanked){
            const flexQuery = `INSERT INTO ranked_stats (puuid, flex_tier, flex_rank, flex_lp, flex_wins, flex_losses) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE flex_tier=?, flex_rank=?, flex_lp=?, flex_wins=?, flex_losses=?`;
            const [results] = await connection.query(flexQuery, [req.params.puuid, flexRanked.tier, flexRanked.rank, flexRanked.leaguePoints, flexRanked.wins, flexRanked.losses, flexRanked.tier, flexRanked.rank, flexRanked.leaguePoints, flexRanked.wins, flexRanked.losses]);
        }
        // Need to select updated results to send back to client
        const query = `SELECT * FROM ranked_stats WHERE puuid=?`;
        const [rows, fields] = await connection.query(query, [req.params.puuid]);
        if(rows.length>0){
            res.status(200).send(rows[0]);
        }
        else{
            res.status(200).send("Not found");
        }
    }
    catch(error){
        if(error.response){
            res.status(error.response.status).send("Error");
        }
        else{
            res.status(500).send("Something unexpected happened... Please try again later.");
        }
    }
});

app.get('/getRankedStats/:puuid', async (req, res)=>{
    try{
        const query = `SELECT * FROM ranked_stats WHERE puuid=?`;
        const [rows, fields] = await connection.query(query, [req.params.puuid]);
        if(rows.length>0){
            res.status(200).send(rows[0]);
        }
        else{
            res.status(200).send("Not found");
        }
    }
    catch(error){
        if(error.response){
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