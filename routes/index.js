'use strict';

const express = require('express');
const router = express.Router();

const Hits = require('./modules/hits');
const People = require('./modules/people');
const Activity = require('./modules/activity');

router.get('/', (req, res, next) => {
  const db = req.db;

  const message = req.query.message || '';
  console.log('message:', message);
  const hitsInSentance = Hits.getFromSentence(message, db); // Get all the hits from the message!

  const messageWithHits = hitsInSentance.then(hitss => Hits.reconstructSentance(message, hitss)); // Get the sentance with hits to render them
  const matchedPeople = hitsInSentance.then(hitss => People.getMatched(hitss, db));

  const people = matchedPeople.then(peopleData => People.getAllData(peopleData, db));

  const peopleWithActivity = people.then(peopleWithoutAcitivity => Activity.add(peopleWithoutAcitivity, db));

  Promise.all([peopleWithActivity, messageWithHits])
    .then((values) => {
      res.render('index', { people: values[0], message, buzzwords: values[1] });
    });

});
module.exports = router;
