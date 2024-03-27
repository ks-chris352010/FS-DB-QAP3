const { Pool } = require('pg');

// Create a PostgreSQL connection pool:
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'OrangePages',
  password: '000rAt000',
  port: 5432,
});

// Function to get all:
const getAll = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM people');
    return result.rows;
  } finally {
    client.release();
  }
};


// Function to get entry by id:
const getEntryById = async (id) => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM people WHERE id = $1', [id]);
        return result.rows[0];
    } finally {
        client.release();
    }
};

// Function to add a name and number:
const createEntry = async (name, number) => {
  const client = await pool.connect();
  try {
    await client.query(
      'INSERT INTO people (name, number) VALUES ($1, $2)',
      [name, number]
    );
  } finally {
    client.release();
  }
};

// Function to update an entry:
const updateEntry = async (id, name, number) => {
  const client = await pool.connect();
  try {
    await client.query(
      'UPDATE people SET name = $2, number = $3 WHERE id = $1',
      [id, name, number]
    );
  } finally {
    client.release();
  }
};

// Function to delete an entry:
const deleteEntry = async (id) => {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM people WHERE id = $1', [id]);
  } finally {
    client.release();
  }
};

module.exports = {
  getAll,
  getEntryById,
  createEntry,
  updateEntry,
  deleteEntry
};


