const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const exixtingUser = await User.findOne({ email });
      if (exixtingUser) {
        return res.status(409).send({ message: "User Already Exist" });
      }
  
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({ message: "Internal server error" });
        } else {
          const newUser = new User({ name, email, password: hash });
          await newUser.save();
          return res.status(201).json({ message: 'User registered successfully' });
        }
      });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      const hashed_password = user?.password;
      if (user) {
        bcrypt.compare(password, hashed_password, (err, result) => {
          if (result) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).send({ message: "Login Success", token });
          } else {
            res.status(401).send({ message: "Invalid credentials" });
          }
        });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { registerUser, loginUser };
