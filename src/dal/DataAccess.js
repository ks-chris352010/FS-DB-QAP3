const { Pool } = require('pg');

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'UserDatabase',
  password: '000rAt000',
  port: 5432,
});

// Function to get all users
const getAllUsers = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users');
    return result.rows;
  } finally {
    client.release();
  }
};


// Function to get a single user by user_id
const getUserById = async (userId) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

// Function to create a new user
const createUser = async (username, email, password, rank) => {
  const client = await pool.connect();
  try {
    await client.query(
      'INSERT INTO users (username, email, password, rank) VALUES ($1, $2, $3, $4)',
      [username, email, password, rank]
    );
  } finally {
    client.release();
  }
};

// Function to update a user's details
const updateUser = async (userId, username, email, password, rank) => {
  const client = await pool.connect();
  try {
    await client.query(
      'UPDATE users SET username = $2, email = $3, password = $4, rank = $5 WHERE user_id = $1',
      [userId, username, email, password, rank]
    );
  } finally {
    client.release();
  }
};

// Function to delete a user
const deleteUser = async (userId) => {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM users WHERE user_id = $1', [userId]);
  } finally {
    client.release();
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
