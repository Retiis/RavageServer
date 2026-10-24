const app = require("express").Router();
const { getContent } = require("../structure/data");

app.get("/progression/v0/profiles", (req, res) => {
    res.json({
        "Profiles": [getContent("progression")]
    });
});

app.get("/progression/v0/inventory/all", (req, res) => {
    res.json({
        "Profiles": [getContent("inventory")]
    });
});

app.get("/progression/v0/loadouts", async (req, res) => {
    res.json({
        "Loadouts": getContent("loadouts")
    })
});

module.exports = app;