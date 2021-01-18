require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { URL } = require("url");
const app = express();
const port = process.env.PORT || 3000;

const { generatePath } = require("./util");

const Link = require("./model/link");

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.post("/create", async (req, res) => {
    const path = req.body.path ? req.body.path : generatePath(6);
    try {
        new URL(req.body.url);
    } catch {
        res.status(400).send("Invalid URL provided to establish link.");
        return;
    }

    let exists = await Link.findOne({
        path,
    });

    if (exists) {
        res.status(400).send("Warp has already been linked.");
        return;
    }

    let link = new Link({
        path,
        url: req.body.url,
    });
    await link.save();

    res.send(`${req.protocol}://${req.get("host")}/${link.path}`);
});

app.get("/:id", async (req, res) => {
    const dest = await Link.findOne({
        path: req.params.id,
    });

    if (dest === null) {
        res.status(404).send("URL not found");
        return;
    }

    res.render("warp", {
        dest,
    });
});

app.listen(port, () => {
    console.log(`Warp listening at http://localhost:${port}`);
});
