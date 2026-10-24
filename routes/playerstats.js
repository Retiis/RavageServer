const app = require("express").Router();
const { getContent } = require("../structure/data");

app.get("/playerstats/v0/timedchallenges", (req, res) => {
    res.json({
        "Results": null,
        "Count": 0
    });
});

app.get("/playerstats/v1/achievements", (req, res) => {
    res.json(getContent("achievements"));
});

app.get("/playerstats/v2/stats", (req, res) => {
    res.json(getContent("playerstats"));
});

module.exports = app;