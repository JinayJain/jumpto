const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
    path: {
        type: String,
        unique: true,
    },
    url: String,
    views: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("Link", linkSchema);
