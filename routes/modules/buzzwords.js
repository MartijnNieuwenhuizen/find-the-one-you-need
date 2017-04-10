const fakeBuzzWordsHits = ['nodeJS', 'javascript', 'Nuon', 'KLM', 'SASS', 'ES6'];

class Buzzwords {
  static create(message) {
    return new Promise(function(resolve, reject) {
      const wordsArray = message.split(' ');

      const wordsArrayWithBuzzwords = wordsArray.map(Buzzwords.checkForBuzzword);
      resolve(wordsArrayWithBuzzwords);

    });
  }

  static checkForBuzzword(word) {
    const comparison = Buzzwords.compareWords(word);

    if (comparison === true) {
      return {
        word,
        match: true,
        type: 'development' // @TODO: make this dynamic
      };
    } else {
      return {
        word,
        matche: false
      };
    }
  }

  static compareWords(word) {
    let isABuzzword = false;
    fakeBuzzWordsHits.forEach(buzzWord => {
      if (buzzWord.toUpperCase() === word.toUpperCase()) { isABuzzword = true; }
    });
    return isABuzzword;
  }
}

module.exports = Buzzwords;
