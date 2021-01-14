const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // validations
        if (!email || !password)
            return res.status(400).json({ msg: "Not all fields have been entered." });

        const user = await User.findOne({ email: email });
        if (!user)
            return res
                .status(400)
                .json({ msg: "No account with this email has been registered." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const role = user.role;
        res.json({
            token,
            role,
            user,
        });
        console.log(role);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        user,
    });
});


module.exports = router;