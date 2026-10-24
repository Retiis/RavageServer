const app = require("express").Router();
const queue = require("../structure/queue");
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");

app.post("/v0/register", (req, res) => {
    const token = jwt.sign(
        {
            exp: 1792938716,
            iss: "illp2p",
            jti: "24ab33f6-a80f-4bed-8148-ae46b5fe32c6",
            sub: "ravage:production:fad95950-8105-4edb-acc1-c1f120ea27fa"
        },
        process.env.JWT
    );
    res.json({
        "Username": token,
        "Password": "testsecret",
        "ExpiresAt": "2026-10-25T14:31:56Z"
    });
});

app.post("/auth/v2/steam/queue", (req, res) => {
    const data = queue.joinQueue(req.query.QueueToken);
    return res.json(data);
});

app.post("/auth/v2/steam/login", async (req, res) => {
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 24);

    return res.json({
        "AccountID": "fad95950-8105-4edb-acc1-c1f120ea27fa",
        "SessionToken": uuid(),
        "IllfonicID": "6942000000000000000",
        "AuthToken": {
            "IssuedAt": new Date().toISOString(),
            "ExpiresAt": expiry.toISOString(),
            "TimeToLiveSeconds": 86399,
            "Token": jwt.sign({ AccountID: "fad95950-8105-4edb-acc1-c1f120ea27fa" }, process.env.JWT)
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
            },
            {
                "Platform": "illfonic",
                "PlatformEntitlementID": "Ill_Patch1_0_3_Compensation",
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