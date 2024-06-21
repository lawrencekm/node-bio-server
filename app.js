// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const uploadRoute = require('./routes/upload');
const downloadRoute = require('./routes/download');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use('/api', uploadRoute);
app.use('/api', downloadRoute);

const port = process.env.PORT || 3008;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
