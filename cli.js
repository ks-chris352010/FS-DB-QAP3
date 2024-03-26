#!/usr/bin/env node

const { program } = require('commander');
const { getAllUsers, createUser, updateUser, deleteUser } = require('./src/dal/DataAccess');

program
  .version('1.0.0')
  .description('User Management CLI');

// Command to list all users
program
  .command('list')
  .alias('ls')
  .description('List all users')
  .action(async () => {
    try {
      const users = await getAllUsers();
      console.log('Users:');
      users.forEach(user => {
        console.log(`- ID: ${user.user_id}, Username: ${user.username}, Email: ${user.email}, Rank: ${user.rank}`);
      });
    } catch (error) {
      console.error('Error listing users:', error.message);
    }
  });

// Command to add a user
program
  .command('add <username> <email> <password> <rank>')
  .description('Add a new user')
  .action(async (username, email, password, rank) => {
    try {
      await createUser(username, email, password, rank);
      console.log('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error.message);
    }
  });

// Command to update a user
program
  .command('update <userId> <username> <email> <password> <rank>')
  .description('Update user details')
  .action(async (userId, username, email, password, rank) => {
    try {
      await updateUser(userId, username, email, password, rank);
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  });

// Command to delete a user
program
  .command('delete <userId>')
  .description('Delete a user')
  .action(async (userId) => {
    try {
      await deleteUser(userId);
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  });

program.parse(process.argv);