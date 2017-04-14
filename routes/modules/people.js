const data = require('./data');

class People {
  // static getAll(hits) {
  //   const people = fakePeople;
  //   const peopleWithKnolage = People.combine(people);
  //
  //   return peopleWithKnolage;
  // }
  //
  // static combine(people) {
  //   const knolage = fakeKnolage;
  //
  //   return people.map(person => {
  //     const knolageId = person.knolageId;
  //
  //     const knolageOfPerson = knolage.filter(obj => obj.id === knolageId);
  //     person.knolage = knolageOfPerson[0];
  //
  //     return person;
  //   });
  // }

  static getMatched(hits) {
      const tags = data.tags;
      const meta = data.meta;
      const people = data.people;
      const projects = data.projects;

      const peeps = hits.forEach(hit => {
        console.log(tags);
      });
  }
}

module.exports = People;
