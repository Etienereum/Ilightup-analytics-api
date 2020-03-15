const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./route/auth');
const postRoute = require('./route/post')

dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT, 
    { useUnifiedTopology: true, useNewUrlParser: true }, 
    () => console.log('Connected to DB!')
    );

// Middlewares
app.use(express.json());

// Rout Middlewares
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);

app.listen(3000, () =>  console.log("Server Up and Running"));
