// // routes/auth.js
// const express = require("express");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// const router = express.Router();

// router.post("/register", async (req, res) => {
//   const { username, password } = req.body;

//   const hashed = await bcrypt.hash(password, 10);

//   const user = new User({
//     username,
//     password: hashed
//   });

//   await user.save();
//   res.json({ message: "User registered" });
// });


// const jwt = require("jsonwebtoken");

// router.post("/login", async (req, res) => {
//   const user = await User.findOne({ username: req.body.username });

//   if (!user) return res.status(400).send("User not found");

//   const valid = await bcrypt.compare(req.body.password, user.password);

//   if (!valid) return res.status(400).send("Wrong password");

//   const token = jwt.sign({ id: user._id }, "secret");

//   res.json({ token });
// });


// module.exports=router;


const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


// 🔹 REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if user exists
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
    user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// 🔹 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // find user
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

