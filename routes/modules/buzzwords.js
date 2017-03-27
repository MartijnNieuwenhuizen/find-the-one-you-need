const fakeBuzzWordsHits = ['nodeJS', 'javascript', 'Nuon', 'KLM', 'SASS', 'ES6'];

const buzzwords = {
  get: function(message) {
    return new Promise(function(resolve, reject) {
      // turn each word into an array
      const words = message.split(' ');

      // filter the mached words from the search sentance
      const matches = words.filter(word => {
        let checker = false;
        // check eacht item in an array like this, so the search isn't case sensative
        fakeBuzzWordsHits.forEach(buzzWord => {
          if (buzzWord.toUpperCase() === word.toUpperCase()) {
            checker = true;
          }
        });
        return checker;
      });

      !matches ? reject('no matches') : resolve(matches);
    });
  }
};

module.exports = buzzwords;
