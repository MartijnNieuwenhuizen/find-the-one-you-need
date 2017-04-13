const fakeData = require('./fakedata');

const people = {
  getByBuzzwords: function(checkedBuzzwords) {
    return new Promise(function(resolve, reject) {
      const tags = checkedBuzzwords.filter(word => word.match === true); // only get the matching tags

      const filterUnique = (tag, i, arr) => arr.indexOf(tag) === i;
      const uniqueTypes = tags
        .map(tag => tag.type) // Get an array of all the types
        .filter(filterUnique); // Filter only the unique types

      // Get all the peeps
      const peeps = fakeData;


      // function _isContains(json, value) {
      //   let contains = false;
      //   // Object.keys(json).some(key => {
      //   //   contains = typeof json[key] === 'object' ?
      //   //   _isContains(json[key], value) : json[key] === value;
      //   //   return contains;
      //   // });
      //   return contains;
      // }

      // Filter only the relevant peeps
      // peeps.filter((peep, i, arr) => {
        // const bla = _isContains(peep, 'NodeJS');
        // console.log('_isContains');
        // console.log(bla);
        // uniqueTypes.forEach(type => {
        //
        //   console.log(peep.tags.development);
        // });
      // });
      // Reder these and indicate whitch types need to collaps


      // resolve(person)
      // reject('no matches');
    });
  }
};

module.exports = people;
