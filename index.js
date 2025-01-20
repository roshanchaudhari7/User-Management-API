const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = 5001;
const logger = require("./middleware/logMiddleware");
const dburl = "mongodb://localhost:27017/";

mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    })

app.use(logger);

app.get("/users", (req, res) => {
    res.send("All Users");
})

app.get('/', (req, res) => {
    res.send("<h1>User Management API</h1> <br/><p> We have built this Api for User Management through node and express</p>");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

