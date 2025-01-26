const mongoose = require("mongoose")

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is Required!"],
        caseSensitive: [true, "Keep the username in lowercase only"],
        trim: [true, "Please Make sure there are no extra spaces"],
        minLength: [3, "Choose a longer username"],
        maxLength: [10, "Choose a shorter username"]
    },
    email: {
        type: String,
        required: [true, "Email is Required!"],
        unique: true,
        trim: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Enter a valid email"]
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password should be atleast 8 characters long"],
        maxLength: [20, "Password should be atmost 20 characters long"],
        trim: true
    },
    role: {
        type: String,
        enum: ["user", "admin", "super admin"],
        default: "user"
    }
})

userSchema.pre('save', async function (next) {
    const user = this;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    }
    catch (err) {
        console.log(err);
    }
})

userSchema.methods.comparePassword = async function (password) {
    const user = this;

    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    }
    catch (err) {
        console.log(err);
    }
}


const User = mongoose.model("User", userSchema);

module.exports = User;
