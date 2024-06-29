// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const uploadRoute = require('./routes/upload');
const downloadRoute = require('./routes/download');
const usersRoute = require('./routes/users');
const authenticationsRoute = require('./routes/authdata');
const authApiRoute = require('./routes/authApi');
const AuthData = require('./models/AuthData');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

    // Set up view engine
app.set('view engine', 'ejs');

app.use('/api', uploadRoute);
app.use('/api', downloadRoute);
app.use('/users', usersRoute);
app.use('/auth', authenticationsRoute);
app.use('/api', authApiRoute );

// Serve static files from the "assets" directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.render('index');
});

const port = process.env.PORT || 3008;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
