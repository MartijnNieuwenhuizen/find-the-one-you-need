const express = require('express');
const router = express.Router();

const Hits = require('./modules/hits');
const People = require('./modules/people');

router.get('/', (req, res, next) => {

  const message = req.query.message || '';
  const hits = Hits.getFromSentence(message); // Get all the hits from the message!
  const messageWithHits = Hits.getInMessage(message, hits); // Get the sentance with hits to render them
  const allPeople = People.getAll(hits);

  console.log(allPeople);



  res.render('index', {people: allPeople, message, buzzwords: messageWithHits});







  // Relevant for the rendering
    // Get the entire sentence with the matched words
    // Get the area's that need to be collapsed

});
module.exports = router;
