const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String, unique: true },
  lastName: { type: String, unique: true },
  middleName: { type: String, unique: true },
  age: { type: Number, require: true },

  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(6);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

// Compare password with hashed password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
