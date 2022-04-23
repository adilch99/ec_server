const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BadRequestError, NotFoundError } = require("../errors/index");

//  register

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const isEmailExist = await User.findOne({ email });

  if (isEmailExist) {
    throw new BadRequestError("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  const savedUser = await user.save();

  savedUser.password = undefined;

  res.status(201).json({ user: savedUser });
};

//  login

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError("User Not Found");
  }

  const isPassOk = await bcrypt.compare(password, user.password);

  if (!isPassOk) {
    throw new BadRequestError("Invalid Credentials");
  }

  user.password = undefined;

  res.status(200).json({ user });
};

module.exports = {
  register,
  login,
};
