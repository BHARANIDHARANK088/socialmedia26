const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

// Register User
router.post("/register", async (request, response) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.body.password, salt);

        const newUser = new User({
            username: request.body.username,
            email: request.body.email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json(error)
    }
})

// Login User
router.post("/login", async (request, response) => {
    try {
        const user = await User.findOne({ email: request.body.email });
        if ( !user )
        {
            return response.status(400).json("User doestn't exist");
        }

        const validateUser = await bcrypt.compare(request.body.password, user.password);
        if ( !validateUser )
        {
            return response.status(400).json("Wrong password");
        }
    
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json(error)
    }
})

module.exports = router;