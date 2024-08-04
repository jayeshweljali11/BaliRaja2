const jwt = require('jsonwebtoken');
const User = require('../shema/auth.schema');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
};

const register = async (req, res) => {
  try {
    const { firstName,middleName, lastName,age,password } = req.body;
    const newUser = new User({ firstName,middleName,lastName,age, password });
    await newUser.save();
    const token = generateToken(newUser);
    res.status(201).json({ Data:newUser,token ,massege:"create new user succesfully"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { firstName,lastName, password } = req.body;
    const user = await User.findOne({ firstName ,lastName });
    if (!user) {
      res.status(401).json({ error: 'Invalid firstName or password' });
      return;
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid firstName or password' });
      return;
    }

    const token = generateToken(user);
    res.json({ token ,message:"user is login in the app" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update a user by ID
const updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search users
const searchUsers = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const users = await User.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
      ],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  searchUsers,
};
