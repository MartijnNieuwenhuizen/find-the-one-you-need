const express = require('express');
const router = express.Router();

const Buzzwords = require('./modules/Buzzwords');
const Areas = require('./modules/Areas');
const People = require('./modules/People');

router.get('/', (req, res, next) => {

  // const message = req.query.message || '';
  // const buzzwords = Buzzwords.create(message);
  // const uniqueAreas = buzzwords.then(words => Areas.getUniqueByBuzzwords(words));
  // const matchedPeople = uniqueAreas.then(areas => People.getByArea(areas, ));
  //
  // Promise.all([buzzwords])
  //   .then(([buzzwords]) => {
  //     res.render('index', { message, buzzwords });
  //   });

});
module.exports = router;
