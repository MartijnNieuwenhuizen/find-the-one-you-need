'use strict';

const express = require('express');
const router = express.Router();

const Hits = require('./modules/hits');
router.get('/', (req, res, next) => {
  const db = req.db;

  Hits.getAll(db)
    .then(response => {
      res.send(response);
    });
});

module.exports = router;
