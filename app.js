const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./apiRoutes');

const app = express();

// Middleware:
app.use(bodyParser.json());

// Set EJS as the view engine:
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

// Mount API routes:
app.use('/api', apiRoutes);

// Start the server:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
