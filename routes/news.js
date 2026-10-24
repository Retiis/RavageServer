const app = require("express").Router();
const { getContent } = require("../structure/data");

app.get("/news/v0/news", (req, res) => {
    res.json(getContent("news"));
});

app.get("/news/v0/alerts", async (req, res) => {
    res.json(getContent("alerts"));
});

module.exports = app;