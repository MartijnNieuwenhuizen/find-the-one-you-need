const express = require('express');
const router = express.Router();

const buzzwords = require('./modules/buzzwords');
const people = require('./modules/people');

router.get('/', (req, res, next) => {
  const content = {};
  const message = req.query.message ? req.query.message : 'Hello You NodeJS people and other KLM employees';

  if (!message.length) { render(); return; }

  content.message = message;
    // Filter the right words from the message. This is a demo function!!!!!
    buzzwords.get(message)
      .then(matches => {
        content.buzzWords = matches;
        return matches;
      })
      .then(words => {
        people.match(words);
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
