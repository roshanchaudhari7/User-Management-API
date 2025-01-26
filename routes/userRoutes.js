const express = require("express");

const User = require("../models/userModels");

const router = express.Router();

router.get('/', (req, res) => {
    res.send("<h1>User Management API</h1> <br/><p> We have built this Api for User Management through node and express</p>");
})

// signup
router.post("/users/signup", async (req, res) => {
    const user = req.body;
    try {
        const addeduser = await User.create(user);
        res.send(`Create User with id: ${addeduser}`);
    }
    catch (err) {
        console.log(err);
    }
})

// login
router.post("/users/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            res.send("User does not exist");
        }
        const isValid = await user.comparePassword(password)

        if (!isValid) {
            res.status(400).send("Password is incorrect");
        }
        else {
            res.send("User is logged in");
        }
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
