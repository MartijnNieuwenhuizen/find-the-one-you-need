const express = require('express');
const router = express.Router();

const Buzzwords = require('./modules/buzzwords');
router.get('/', (req, res, next) => {

  const message = req.query.message || '';
  const buzzwords = Buzzwords.create(message);

  Promise.all([buzzwords])
    .then(([buzzwords]) => {
      res.render('index', { message, buzzwords });
    });

});
module.exports = router;
