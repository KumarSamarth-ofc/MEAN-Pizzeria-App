const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");    
const User = require("../models/User");

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    }catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

exports.login = async (req, res,next) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Sign JWT
        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn:
        '2h' });
        res.json({ token });    


    }catch(err) {
        res.status(500).json({ message: "Server error" });
        next(err);
    }
}