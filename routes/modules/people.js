class People {
  static getUnique(results) {
    const filterUnique = (tag, i, arr) => arr.indexOf(tag) === i;
    const result = results.filter(filterUnique);

    return result;
  }

  static getPeopleData(peopleIds, db) {
    return new Promise(function(resolve, reject) {
      const people = db.get('people');
      const matches = [];
      people.find({})
        .each((person, {close, pause, resume}) => {
          const personNeeded = peopleIds.includes(String(person._id));
          if ( personNeeded ) {
            matches.push(person);
          }
        })
        .then(() => {
          resolve(matches);
        });
    });
  }

  static getMatched(hits, db) {
    return new Promise(function(resolve, reject) {
      const peopleIds = [];
      const tags = db.get('tags');
      const hitToSmallerCase = hits.map(hit => hit.name.toLowerCase());

      // 58f0da01875ac759ff31f2ca
      // 58f0da01875ac759ff31f2cb
      // 58f0da01875ac759ff31f2cc

      // nodejs
      // es6

      // tags.insert([
      //   {
      //     name: 'xml',
      //     fullName: 'XML',
      //     type: 'knolage',
      //     category: 'front-end',
      //     subCategory: 'js',
      //     people: [ '58f0da01875ac759ff31f2ca' ]
      //   }
      // ]);



      tags.find({})
        .each((tag, {close, pause, resume}) => {
          const match = hitToSmallerCase.includes(tag.name);
          if (match) {
            peopleIds.push(...tag.people);
            resume();
          }
        })
        .then(() => {
          const uniqueMatches = People.getUnique(peopleIds);
          const matchedPeople = People.getPeopleData(uniqueMatches, db);
          matchedPeople
            .then(people => {
              resolve(people);
            });
        });
    });
  }

  static getAllData(peopleData, db) {
    return new Promise(function(resolve, reject) {
      const tags = db.get('tags');
      const people = peopleData;
      const peopleIds = peopleData.map(personData => String(personData._id));

      people.forEach(person => {
        person.knolage = [];
        person.project = [];
      });

      tags.find({})
        .each((tag, {close, pause, resume}) => {

          const tagPeopleIds = tag.people;
          tagPeopleIds.forEach(id => {

            const personalId = peopleIds.indexOf(id);

            if ( personalId !== -1 ) {
              switch (tag.type) {
                case 'knolage':
                  const knolageItem = {};
                  if (tag.name) { knolageItem.name = tag.name; }
                  if (tag.type) { knolageItem.type = tag.type; }
                  if (tag.category) { knolageItem.category = tag.category; }
                  if (tag.subCategory) { knolageItem.subCategory = tag.subCategory; }

                  people[personalId].knolage.push(knolageItem);
                break;
                case 'project':
                  const projectItem = {};
                  if (tag.name) { projectItem.name = tag.name; }
                  if (tag.type) { projectItem.type = tag.type; }

                  people[personalId].project.push(projectItem);
                break;
                default:

              }
            }
          });
        })
        .then(() => {
          // reorder the knolage points
          people.forEach(person => {
            person.knolage = People.reorderKnolage(person.knolage);
          });

          resolve(people);
        });
      // loop thrue the knolage points
      // if an people id exists in the array, add to the person
      // return the person ready to render

      // loop thrue the knolage points


      // if an people id exists in the array, add to the person


      // return the person ready to render

    });
  }

  static reorderKnolage(knolage) {
    const _knolage = knolage;
    const filterUnique = (tag, i, arr) => arr.indexOf(tag) === i;

    // Get all uique categories
    const categories = _knolage
      .map(item => item.category)
      .filter(filterUnique);

    // Get all uique sub categories
    const subCategories = _knolage
      .map(item => item.subCategory)
      .filter(filterUnique);

    // Create a new knolage Structure
    const newKnolage = [];

    // Create all categories for a person
    categories.forEach(category => {
      newKnolage.push({
        name: category,
        subArea: []
      })
    })

    // Create all sub categories for a person
    subCategories.forEach(subCategory => {
      // get matching categorie
      const parentCategory = _knolage
        .map(item => {
          if (item.subCategory === subCategory) {
            return item.category;
          }
        })
        .filter(filterUnique).join('');
      const parentCategoryIndex = newKnolage.map((item, i) => {
        if (item.name === parentCategory) {
          return i;
        }
      }).join('');

      newKnolage[parentCategoryIndex].subArea.push({
        name: subCategory,
        points: []
      });
    });

    // add all the points to the right subCategories
    _knolage.forEach(knolagePoint => {
      const catagoryIndex = newKnolage.map((item, i) => {
        if (item.name === knolagePoint.category) {
          return i;
        }
      }).join('');

      const subCatagoryIndex = newKnolage[catagoryIndex].subArea.map((item, i) => {
        if (item.name === knolagePoint.subCategory) {
          return i;
        }
      }).join('');

      newKnolage[catagoryIndex].subArea[subCatagoryIndex].points.push({
        name: knolagePoint.name,
        hash: knolagePoint.name
      });
    });

    return newKnolage;
  }

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

}

module.exports = People;
