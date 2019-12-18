const express = require('express');
const passport = require('passport');
const strategy = require('passport-facebook');

const router = express.Router();
const FacebookStrategy = strategy.Strategy;

const scope = [
  'instagram_basic',
  'pages_show_list',
  //   'instagram_manage_comments',
  //   'instagram_manage_insights',
];

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_APP_ID,
      clientSecret: process.env.FB_APP_SECRET,
      callbackURL: process.env.IG_AUTH_CALLBACK,
      profileFields: ['email', 'name'],
    },
    function(accessToken, refreshToken, profile, done) {
      const {
        email,
        first_name: firstName,
        last_name: lastName,
      } = profile._json;

      console.log(`The access token is: ${accessToken}`);
      const userData = {
        email,
        firstName,
        lastName,
      };

      console.log(userData);
      return done(null, profile);
    }
  )
);

router.get(
  '/auth',
  passport.authenticate('facebook', {
    scope,
  })
);
router.get(
  '/auth/callback',
  passport.authenticate('facebook', {
    successRedirect: '/facebook/auth/success',
    failureRedirect: '/facebook/auth/fail',
  })
);

router.get('/auth/fail', (req, res) => {
  res.send('Failed attempt :(');
});

router.get('/auth/success', (req, res) => {
  res.send('Success');
});

router.get('/auth/logout', (req, res) => {
  res.logout();
  res.redirect('/');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
