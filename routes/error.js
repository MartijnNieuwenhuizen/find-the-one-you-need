const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const content = {
    test: 'error'
  };
  res.render('error', content);
});
module.exports = router;
