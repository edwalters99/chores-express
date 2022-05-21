const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 3000; // this is so it works when hosted and lets the host provider assign a port for you.

const app = express();
app.use(cors()); //enables cors

app.get('/', (req, res) => {
    res.status(200).json({ message : 'Welcome to the Chores Api' });
});

//Routes
app.use('/api/users', require('./routes/userRoutes'));   // connects endpoint to Routes


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));