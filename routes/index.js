const express = require('express');
const router = express.Router();

const Hits = require('./modules/hits');
const People = require('./modules/people');

router.get('/', (req, res, next) => {
  const db = req.db;

  const message = req.query.message || '';
  console.log('message:', message);
  const hitsInSentance = Hits.getFromSentence(message, db); // Get all the hits from the message!

  const messageWithHits = hitsInSentance.then(hitss => Hits.reconstructSentance(message, hitss)); // Get the sentance with hits to render them
  const matchedPeople = hitsInSentance.then(hitss => People.getMatched(hitss, db));

  const people = matchedPeople.then(peopleData => People.getAllData(peopleData, db));

  Promise.all([people, messageWithHits])
    .then(([peopleRender, buzzwordMessage]) => {
      res.render('index', { people: peopleRender, message, buzzwords: buzzwordMessage });
    });

  // Relevant for the rendering
    // Get the entire sentence with the matched words
    // Get the area's that need to be collapsed

});
module.exports = router;
