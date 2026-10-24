const app = require("express").Router();
const { getContent } = require("../structure/data");

app.get("/reporting/v0/reasons", (req, res) => {
    res.json(getContent("reporting"));
});

module.exports = app;