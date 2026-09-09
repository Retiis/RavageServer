const app = require("express").Router();
const fs = require("fs");
const config = require("../data/config.json");
const config_metadata = require("../data/config_metadata.json");

app.get("/config/v1/regions", async (req, res) => {
    return res.json(config);
});

app.post("/config/v0/metadata", async (req, res) => {
    return res.json(config_metadata);
});

module.exports = app;