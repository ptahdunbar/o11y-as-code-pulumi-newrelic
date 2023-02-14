// Import the New Relic agent configuration module.
require("newrelic");

const express = require("express");
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
    res.status(200).json({
        message: "Hello World"
    });    
});

app.get("/foo", async (req, res) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 5000)
    })

    // Deliberately return a server error.
    res.status(500).json({
        message: "Oh no! Something went wrong."
    });
});

app.get("/bar", async(req, res) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 3000)
    })

    // Deliberately return a server error.
    res.status(400).json({
        message: "Oh no! Something went wrong."
    });
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}...`);
});