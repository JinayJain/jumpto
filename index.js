require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
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
    const path = req.body.path ? req.body.path : generatePath(5);

    const newLink = new Link({
        path,
        url: req.body.url,
    });

    await newLink.save();

    res.send(`${req.protocol}://${req.get("host")}/${newLink.path}`);
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
