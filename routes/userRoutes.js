const express = require("express");

const User = require("../models/userModels");

const router = express.Router();

router.get('/', (req, res) => {
    res.send("<h1>User Management API</h1> <br/><p> We have built this Api for User Management through node and express</p>");
})

// add users
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

// find all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        console.log(err);
    }
})

// find user by id
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    } catch (err) {
        console.log(err);
    }
})

// delete user by id
router.delete('/users/:id', async (req, res) => {
    try {
        const deleteduser = await User.findByIdAndDelete(req.params.id);
        res.send(`Deleted user with id : ${deleteduser}`);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
