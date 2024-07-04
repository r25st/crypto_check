import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
const API_KEY = process.env.API_KEY;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

let searchResult = {};

app.get("/", (req, res) => {
    res.render("index.ejs", {
        name: searchResult.name,
        rank: searchResult.rank,
        price: Math.floor(searchResult.price),
        market: searchResult.market_cap,
        volume: searchResult.volume_24h,
    });
});

app.post("/search", async (req, res) => {
    const toCurrency = req.body.currencies;
    try {
        const response = await axios.get(`https://coinlib.io/api/v1/coinlist?key=${API_KEY}&pref=${toCurrency}&order=volume_desc`);
        const resultRaw = response.data.coins;
        const coinRawWord = req.body.cryptoName;
        const coin = coinRawWord.charAt(0).toUpperCase() + coinRawWord.slice(1).toLowerCase();
        const result = resultRaw.filter(i => i.name === coin);

        if (result.length === 0) {
            searchResult = {}; // Clear previous result if no coin is found
        } else {
            searchResult = result[0]; // Save the first matching result
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});