const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const colors = require('colors'); // colors in console.logs
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000; // this is so it works when hosted and lets the host provider assign a port for you.

//Connect to database
connectDB();


const app = express();
app.use(cors());
app.use(express.json()); // so the server can accept raw json in post request
app.use(express.urlencoded({extended: false})); // so the server can accept url encoded form data in post request


app.get('/', (req, res) => {
    res.status(200).json({ message : 'Welcome to the Chores Api' });
});

//Routes
app.use('/api/users', require('./routes/userRoutes'));   // connects userRoutes to /api/users.  Sub routes are then defined in userRoutes.

app.use(errorHandler);  // custom error handler (middleware)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));