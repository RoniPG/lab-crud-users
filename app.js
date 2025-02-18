const express = require('express');
const logger = require('morgan');

// Express app
const app = express();

// Database setup
require('./config/db.config');

// Middleware setup
app.use(express.json());
app.use(logger('dev'));

// Routes setup
const routes = require('./config/routes.config');
app.use('/', routes);

// Server port setup
const PORT = Number(process.env.PORT || 3000);
app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});