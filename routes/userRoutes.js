const express = require("express");

const User = require("../models/userModels");

const router = express.Router();

router.get('/', (req, res) => {
    res.send("<h1>User Management API</h1> <br/><p> We have built this Api for User Management through node and express</p>");
})

router.post("/users/:id", async (req, res) => {
    const user = req.body;
    try {
        const addeduser = await User.create(user);
        res.send(`Create User with id: ${addeduser}`);
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = router;
