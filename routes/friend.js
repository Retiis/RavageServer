const app = require("express").Router();
const { v4: uuid } = require("uuid");

app.post("/friend/v0/register", (req, res) => {
    res.json({
        "Project": "Ravage",
        "Environment": "Production",
        "AccountID": "fad95950-8105-4edb-acc1-c1f120ea27fa",
        "Platform": "Steam",
        "Gamertag": "Retii",
        "InviteCode": "ZMZJB4ZEQR"
    });
});

app.get("/friend/v0/relationships", (req, res) => {
    res.json({
        "Relationships": null,
        "Count": 0
    });
})

module.exports = app;