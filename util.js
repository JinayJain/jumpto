function generatePath(length) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let path = "";
    for (let i = 0; i < length; i++) {
        path += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return path;
}

module.exports = {
    generatePath,
};
