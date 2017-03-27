const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const content = {
    test: 'test'
  };
  res.render('index', content);
});

module.exports = router;
