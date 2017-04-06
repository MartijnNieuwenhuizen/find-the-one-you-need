const express = require('express');
const router = express.Router();

const buzzwords = require('./modules/buzzwords');

router.get('/', (req, res, next) => {
  const content = {};
  const message = req.query.message;

  if (!message) { render(); }

  content.message = message;
    // Filter the right words from the message. This is a demo function!!!!!
    buzzwords.get(message)
      .then(matches => {
        content.buzzWords = matches;

        // Search matches
        render();
      })
      .catch(err => {
        console.log('err: ', err);
      });

    function render() {
      res.render('index', content);
    }
});

module.exports = router;
