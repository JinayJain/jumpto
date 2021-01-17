const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/me", (req, res) => {
    res.redirect("http://jinay.dev/");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
