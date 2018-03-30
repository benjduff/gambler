const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/db');

module.exports  = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //Extract JsonWebToken from Header
    opts.secretOrKey = config.secret; //Add key from config
    
    /* JwtStrategy(opts, verify). 'opts' is an object literal containing options to control 
    how the token is extracted from the request or verified. secretOrKey is a string or buffer 
    containing the secret (symmetric) or PEM-encoded public key (asymmetric) for verifying the 
    token's signature. */ 
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => { 
        console.log(jwt_payload);
        User.getUserById(jwt_payload.data._id, (err, user) => { //call model.getUserById
            if(err){
                return done(err, false); //if there is an error the user was not returned.
            }

            if(user){
                return done(null, user); //pass the user if it is found
            } else {
                return done(null, false);
            }
        });
    }))
}