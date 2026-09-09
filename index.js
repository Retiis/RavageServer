require("dotenv").config({ debug: false });
const express = require("express");
const fs = require("fs");
const log = require("./structure/log");

const app = express();
const routes = fs.readdirSync("./routes").filter(route => route.endsWith(".js"));

//app.use(ratelimit({ windowMs: 0.5 * 60 * 1000, max: 45 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes.forEach(route => {
    app.use(require(`./routes/${route}`));
    log(1, `Route ${route} loaded`);
});

app.use((req, res, next) => {
    return res.status(404).end();
});

if (process.argv.includes("--dev")) {
    require("./debug")();
} else {
    app.listen(process.env.PORT, () => {
        log(2, `Server started on port ${process.env.PORT}`);
    });
}