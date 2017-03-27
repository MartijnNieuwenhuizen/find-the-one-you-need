const express = require('express');
const router = express.Router();

const buzzwords = require('./modules/buzzwords');






router.get('/', (req, res, next) => {
  const content = {
    test: 'test'
  };
  res.render('index', content);
});






router.post('/', (req, res, next) => {
  const content = {};
  const message = req.body.message;
  if (!message) { res.rederect('404'); }

    // Filter the right words from the message
    // This is a demo function!!!!!
    buzzwords.get(message)
      .then(matches => {
        content.buzzWords = matches;
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
