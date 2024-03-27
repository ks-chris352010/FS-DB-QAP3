#!/usr/bin/env node

// This was just for me to test the database.
const { program } = require('commander');
const { getAll, createEntry, updateEntry, deleteEntry } = require('./src/dal/DataAccess');

program
  .version('1.0.0')
  .description('User Management CLI');

// Command to list all users
program
  .command('list')
  .alias('ls')
  .description('List all')
  .action(async () => {
    try {
      const users = await getAll();
      console.log('Names and Numbers:');
      users.forEach(entry => {
        console.log(`- ID: ${entry.id}, name: ${entry.name}, number: ${entry.number}`);
      });
    } catch (error) {
      console.error('Error listing users:', error.message);
    }
  });

// Command to add a user
program
  .command('add <name> <number>')
  .description('Add a new entry')
  .action(async (name, number) => {
    try {
      await createEntry(name, number);
      console.log('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error.message);
    }
  });

// Command to update a user
program
  .command('update <id> <name> <number>')
  .description('Update user details')
  .action(async (id, name, number) => {
    try {
      await updateEntry(id, name, number);
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  });

// Command to delete a user
program
  .command('delete <id>')
  .description('Delete a user')
  .action(async (id) => {
    try {
      await deleteEntry(id);
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  });

program.parse(process.argv);