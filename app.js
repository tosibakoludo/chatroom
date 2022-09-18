const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("RADI SVE!!!");
});

app.listen(PORT, () => {
    console.log("SLUSAM PORT!!!");
});