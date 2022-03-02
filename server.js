const express = require('express');
const authBackend = require('./authbackend');
const getDashboardData = require("./databackend");


const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req, res) => {
    const token = authBackend()
    const query = req.query.query
    res.header("Access-Control-Allow-Origin", "*");
    if(!query) {
        res.send("Provide ?query parameter with data query")
    }
    token.then((tokenResponse) => {
        console.log("Token from cache " + tokenResponse.fromCache)
        let data = getDashboardData(query, tokenResponse)
        data.then(result => {
            res.send(result)
        })
    }).catch((error) => {
        console.log(JSON.stringify(error));
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
