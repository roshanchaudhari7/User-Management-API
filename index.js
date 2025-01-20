const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = 5001;
const logger = require("./middleware/logMiddleware");
// const dburl = "mongodb://localhost:27017/";
const clouddburl = "mongodb+srv://roshanchaudhari1872002:vpIuuwADIZpUNuWw@cluster0.3fcjz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const User = require("./models/userModels");

app.use(express.json());

app.use(logger);

mongoose.connect(clouddburl)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    })


app.get("/users", (req, res) => {
    res.send("All Users");
})

app.post("/users/:id", async (req, res) => {
    const user = req.body;
    try {
        const addeduser = await User.create(user);
        res.send(`Create User with id: ${addeduser}`);
    }
    catch (err) {
        console.log(err);
    }
})

app.get('/', (req, res) => {
    res.send("<h1>User Management API</h1> <br/><p> We have built this Api for User Management through node and express</p>");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

