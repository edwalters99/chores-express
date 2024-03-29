const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const colors = require('colors'); // colors in console.logs
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000; // lets the hosting provider assign a port

// Connect to database
connectDB();

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Chores Api' });
});

//Routes
app.use('/api/users', require('./routes/userRoutes')); // connects userRoutes to /api/users.  Sub routes are then defined in userRoutes.
app.use('/api/children', require('./routes/childRoutes'));

app.use('/api/favourites', require('./routes/favouriteRoutes'));

app.use(errorHandler); // custom error handler (middleware)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
