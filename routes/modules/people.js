const fakePeople = require('./fakePeople');
const fakeKnolage = require('./fakeKnolage');

class People {
  static getAll(hits) {
    const people = fakePeople;
    const peopleWithKnolage = People.combine(people);

    return peopleWithKnolage;
  }

  static combine(people) {
    const knolage = fakeKnolage;

    return people.map(person => {
      const knolageId = person.knolageId;

      const knolageOfPerson = knolage.filter(obj => obj.id === knolageId);
      person.knolage = knolageOfPerson[0];

      return person;
    });
  }
}

module.exports = People;
