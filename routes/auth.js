const app = require("express").Router();
const queue = require("../structure/queue");
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");

app.get("/auth/v2/steam/queue", (req, res) => {
    const data = queue.joinQueue(req.query.QueueToken);
    return res.json(data);
});

app.post("/auth/v2/steam/login", async (req, res) => {
    return res.json({
        "AccountID": uuid(),
        "SessionToken": uuid(),
        "IllfonicID": "69420",
        "AuthToken": {
            "IssuedAt": new Date().toISOString(),
            "ExpiresAt": new Date().toISOString(),
            "TimeToLiveSeconds": 86399,
            "Token": ""
        },
        "PlayerEntitlements": [
            {
                "Platform": "steam",
                "PlatformEntitlementID": "3219630",
                "Count": 1
            },
            {
                "Platform": "steam",
                "PlatformEntitlementID": "4686710",
                "Count": 1
            }
        ]
    });
});

app.post("/session/v0/sessions/player", async (req, res) => {
    return res.json({
        "SessionID": uuid(),
        "SessionType": "player",
        "TimeToLiveSeconds": 240
    });
});

module.exports = app;