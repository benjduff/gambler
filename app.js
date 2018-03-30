const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/db');

//connect to db
mongoose.connect(config.database);

//on connect execute this
mongoose.connection.on('connected', function(){
    console.log('connected to database: ' + config.database);
})

//check for db error
mongoose.connection.on('error', function(err){
    console.log('Database error: ' + err);
})

//initialise express
const app = express();

const users = require('./routes/users');

//port number
const port = 3000;

//CORS middleware
app.use(cors());


//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body-parser middleware
app.use(bodyParser.json());

//saying "use '/users' for all of our user routes"
app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
  });

//start server
app.listen(port, function(){
    console.log('Server started on port:  ' + port);
})
