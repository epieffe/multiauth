const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = '___________';
const GOOGLE_CLIENT_SECRET = '____________';

const app = express();

app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // Qui puoi salvare il profilo utente nel database
    console.log(`PROVAA: ${JSON.stringify(profile)}`);
    cb(null, {id: profile.id, email: profile.emails[0].value});
  }
));

app.get('/auth/google', passport.authenticate('google', { scope: ['email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  function(req, res) {
    console.log(`PROVAA: ${JSON.stringify(req.user)}`);
    res.send("LESGOOO");
  }
);

app.listen(3000);
