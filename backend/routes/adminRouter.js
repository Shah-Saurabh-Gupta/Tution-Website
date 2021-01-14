const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const Blog = require("../models/noticeModel");

router.post("/registerStudent", async (req, res) => {
    try {
        let { email, password, displayName, batch, address, phone, role } = req.body;

        //Validations
        if (!email || !password || !displayName || !batch || !address || !phone)
            return res.status(400).json({ msg: "Not all fields have been entered" });
        if (password.length < 5)
            return res.status(400).json({ msg: "Password needs to be atleast 5 characters long" });

        const existingUser = await User.findOne({ email: email });
        if (existingUser)
            return res
                .status(400)
                .json({ msg: "An account with this email already exists." });

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: passwordHash,
            displayName,
            batch,
            address,
            phone,
            role,
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ err });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ err });
    }
});
router.put("/:id", async (req, res) => {
    try {
        User.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
            User.findOne({ _id: req.params.id }).then(function (user) {
                res.json(user);
            });
        });
    } catch (err) {
        res.status(500).json({ err });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.delete("notices/:id", async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        res.json(deletedBlog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;