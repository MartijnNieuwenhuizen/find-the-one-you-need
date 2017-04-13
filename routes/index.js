const express = require('express');
const router = express.Router();

const Buzzwords = require('./modules/buzzwords');
const People = require('./modules/people');

router.get('/', (req, res, next) => {

  const message = req.query.message || '';
  const buzzwords = Buzzwords.create(message);
  const matches = buzzwords.then(words => People.getByBuzzwords(words));

  Promise.all([buzzwords])
    .then(([buzzwords]) => {
      res.render('index', { message, buzzwords });
    });

});
module.exports = router;
