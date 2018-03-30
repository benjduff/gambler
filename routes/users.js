const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

//register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg:'Failed to register user'});
        } else {
            res.json({success: true, msg:'User has been registered'});
        }
    })
});

//authenticate
router.post('/auth', (req, res, next) => {
    res.send('AUTHENTICATE');
});

//gambler game
router.get('/gamble', (req, res, next) => {
    res.send('GAMBLE');
});


module.exports = router;