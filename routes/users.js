const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
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
    console.log(req.body.username);
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user)  => { 
        console.log(user);
        
        if(err) throw err;
        if(!user){ //if no user returned send response to client
            return res.json({success: false, msg:'User not found'});
        }

         //takes pwd from form and hashed pwd that was send back with the user
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){  //if isMatch is true pwds match then create token and send following json res
                const token = jwt.sign({data:user}, config.secret, {
                    expiresIn: 21600 //6 hours
                });

                res.json({
                    success: true,
                    token: 'Bearer '+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else { //if pwds dont match send this
                return res.json({success: false, msg:'Wrong password'});
            }
        })
    })
});

//gambler game
router.get('/gamble', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
  });


module.exports = router;