class Areas {
  static getUniqueByBuzzwords(words) {
    const filterUnique = (tag, i, arr) => arr.indexOf(tag) === i;
    return words
      .map(word => word.type)
      .filter(filterUnique);
  }
}

module.exports = Areas;
