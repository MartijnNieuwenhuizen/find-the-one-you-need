'use strict';

const Hits = {
  getFromSentence: function(sentence, db) {
    return new Promise(function(resolve, reject) {
      const sentenceArray = sentence.split(' ');
      const lowerCaseSentance = sentenceArray.map(word => word.toLowerCase());
      const hits = Hits.match(lowerCaseSentance, db);

      hits.then(result => {
        resolve(result);
      });
    });
  },

  getAll: function(db) {
    return new Promise(function(resolve, reject) {
      const tags = db.get('tags');
      tags.find({})
        .then(matches => {
          resolve(matches);
        });
    });
  },

  match: function(sentenceArray, db) {
    return new Promise(function(resolve, reject) {
      const tags = db.get('tags');
      const matches = [];

      tags.find({})
        .each(tag => {
          const match = sentenceArray.includes(tag.name);
          if (match) {
            const type = tag.category ? tag.category : tag.type;

            matches.push({
              name: tag.name,
              type: type
            });
          }
        })
        .then(() => {
          resolve(matches);
        });
    });
  },

  reconstructSentance: function(sentence, hits) {
    const sentenceArray = sentence.split(' ');

    const sentenceWithHits = sentenceArray.map(word => {
      let isHit = false;
      let type;
      hits.forEach(hit => {
        if ( word.toLowerCase() === hit.name.toLowerCase() ) {
          isHit = true;
          type = hit.type;
        }
      });

      if (isHit) {
        return {
          word,
          match: true,
          type: type
        };
      } else {
        return {
          word,
          matche: false
        };
      }
    });
    return sentenceWithHits;
  }
};

module.exports = Hits;
