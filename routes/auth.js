const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/auth-helpers');
const passport = require('../auth/local');

router.get('/register', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/register');
});


// with loginRedirect - it redirects a logged in user to their user profile page if
// they're already logged in since we don't want logged in users accessing the register page.
// or if user is not logged in it calls next middleware function
// in this case, the next function goes to registration page
// can find loginRedirect in authHelpers.js file

router.post('/register', (req, res, next) => {
  return authHelpers.createUser(req,res)
  .then((response) => {
    console.log('registration successful');
  })
  .catch((err) => {res.status(500).json({ status: 'error' }); });
});

router.get('/login', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/auth/login',
  failureFlash: true
 })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;
