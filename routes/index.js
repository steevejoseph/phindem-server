const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/auth', function(req, res, next) {
  res.status(200).send('ok');
});

router.get('/home', function(req, res, next) {
  res.status(200).send('home');
});

module.exports = router;
