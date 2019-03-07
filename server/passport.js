const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./api/user/user.model');

const localStrategy = () => {
    Passport.serializeUser(function(user, done) {
        done(null, user);
    });

    Passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    const localField = {
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    };

    const localCallback = async (req, email, password, done) => {
        let user = await User.findOne({email: email}).catch(err => done(err));
        if (!user || user.password !== password) {
            return done(null, false, {message: 'Incorrect email or password.'});
        }
        return done(null, user);
    };
    Passport.use('local', new LocalStrategy(localField, localCallback));
};

module.exports = localStrategy;