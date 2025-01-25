const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = 5001;
const logger = require("./middleware/logMiddleware");
// const dburl = "mongodb://localhost:27017/";
const clouddburl = "mongodb+srv://roshanchaudhari1872002:vpIuuwADIZpUNuWw@cluster0.3fcjz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const User = require("./models/userModels");
const userRoutes = require("./routes/userRoutes")
app.use(express.json());

app.use(logger);

mongoose.connect(clouddburl)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    })

app.use("/", userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

