const User = require("../models/UserModel");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const secret = "mysecret";

const createUser = async (req, res) => {
  try {
    const { email, password, role, isLoggedIn, profileInformation } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashPassword,
      role,
      isLoggedIn,
      profileInformation,
    });
    let data = await newUser.save();
    console.log(data);
    res.send("User created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error in creating user", err);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  // Check whether this email exists in my database
  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user) {
      // User exists
      // Compare the passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign({ email, role: user.role }, secret);
        res.status(200).json({ token, user });
      } else {
        res.status(401).send("Password is incorrect");
      }
    } else {
      // User does not exist
      res.status(404).send("User does not exist");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  createUser,
  userLogin,
};
