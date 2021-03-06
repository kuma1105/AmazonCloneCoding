const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

// SIGN UP
authRouter.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User with same email already exists!' });
        }

        const hashedPassword = await bcryptjs.hash(password, 8);

        let user = new User({
            email,
            password: hashedPassword,
            name,
        })

        user = await user.save();

        res.json({ user: user });
        // get data from client
        // post that data in DB
        // return that data to the user
    } catch (e) {
        res.status(500).json({ error: e.message });
    }

});

// SIGN IN
authRouter.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ msg: "User with this email dose mot exist!" })
        }

        const isMatch = bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password." })
        }

        const token = jwt.sign({ id: user._id }, "passwordKey");
        res.json({ token, ...user._doc });
        // {
        //     'token': 'tokensomething'
        //     'name':'jsh'
        //     'email':'111@gmail.com'
        // }
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
});

module.exports = authRouter;