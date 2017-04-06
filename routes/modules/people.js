const people = {
  match: function(allWords) {
    return new Promise(function(resolve, reject) {
      const tags = allWords.filter(word => word.match === true); // only get the matching tags
      const types = tags.reduce()
      // Get the types we need to filter on (Development in the example)

      people.filter()

      // resolve(person)
      // reject('no matches');
    });
  }
};

module.exports = people;
