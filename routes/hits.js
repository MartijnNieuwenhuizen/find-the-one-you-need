const express = require('express');
const router = express.Router();

const Hits = require('./modules/hits');
router.get('/', (req, res, next) => {
  console.log('getting a req');
  const db = req.db;

  Hits.getAll(db)
    .then(response => {
      console.log('response: ', response);
      res.send(response);
    });
});

module.exports = router;
