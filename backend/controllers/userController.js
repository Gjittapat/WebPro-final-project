const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, role: user.role }); // Include the role field in the response
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// signup a user
const signupUser = async (req, res) => {
  const { email, password, role } = req.body

  try {
    const user = await User.signup(email, password, role)
    console.log("role: ", user);
    // create a token
    const token = createToken(user._id)

    res.status(200).json({ email, token, role })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// get a single user
const getOneUser = async (req, res) => {
  //get the id from the params
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}


module.exports = { signupUser, loginUser, getAllUsers, getOneUser }