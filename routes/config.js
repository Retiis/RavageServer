const app = require("express").Router();
const { getContent } = require("../structure/data");

app.get("/config/v0/manifest", async (req, res) => {
    return res.send(getContent("BuildManifest-Windows"));
});

app.get("/config/v1/regions", async (req, res) => {
    return res.json(getContent("config"));
});

app.post("/config/v0/metadata", async (req, res) => {
    return res.json(getContent("config_metadata"));
});

module.exports = app;