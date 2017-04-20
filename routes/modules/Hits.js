const fakeHitWords = ['nodeJS', 'javascript', 'Nuon', 'KLM', 'SASS', 'ES6'];

class Hits {
  static getFromSentence(sentence) {
    const sentenceArray = sentence.split(' ');
    const hits = Hits.match(sentenceArray);

    return hits;
  }

  static match(sentenceArray) {
    return fakeHitWords.filter(possibleHit => {
      let isHit = false;

      sentenceArray.forEach(word => {
        if ( possibleHit.toUpperCase() === word.toUpperCase() ) { isHit = true; }
      });

      return isHit;
    });
  }

  static getInMessage(sentence, hits) {
    const sentenceArray = sentence.split(' ');

    const sentenceWithHits = sentenceArray.map(word => {
      let isHit = false;
      hits.forEach(hit => {
        if ( word.toUpperCase() === hit.toUpperCase() ) { isHit = true; }
      });

      if (isHit) {
        let type = 'front-end';
        if (word === 'Nuon' || word === 'KLM') {
          type = 'project';
        }
        return {
          word,
          match: true,
          type: type // @TODO: make this dynamic
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
}

module.exports = Hits;
