const fakePeople = require('./fakePeople');
const fakeKnolage = require('./fakeKnolage');

class People {
  static getByArea(areas) {
    return new Promise(function(resolve, reject) {

      const _uniqueAreas = areas.uniqueAreas;
      const _tags = areas.areas;

      console.log('_uniqueAreas: ', _uniqueAreas);
      console.log('_tags: ', _tags);


      // Get all the area's that need to be show with the people
      // find the buzzwords in the area and give them an active class?
      // const areas = Areas.filterAreas(words);



      // How to:
      // Get all the tags from the search query
      // Get all the relevant area's i need te search in
      // Check if each person
    });
  }
}

module.exports = People;
