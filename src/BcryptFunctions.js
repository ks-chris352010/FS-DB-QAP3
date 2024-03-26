const bcrypt = require('bcrypt');

// Function to hash a password:
const hashPassword = async (password) => {
  try {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

// Function to check if a plain text password matches a hashed password:
const comparePasswords = async (plainTextPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  hashPassword,
  comparePasswords
};
