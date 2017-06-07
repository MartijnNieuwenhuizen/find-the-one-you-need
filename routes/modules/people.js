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

  // Get all possible matches
  static getAllMatched(hits, db) {
    return new Promise(function(resolve, reject) {
      const peopleIds = [];
      const tags = db.get('tags');
      const hitToSmallerCase = hits.map(hit => hit.name.toLowerCase());

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
          matchedPeople.then(people => {
            resolve(people);
          });
        });
    });
  }

  // Get all people who match all the tags
  static getMatched(hits, db) {
    return new Promise(function(resolve, reject) {
      const peopleIds = [];
      const tags = db.get('tags');
      const hitToSmallerCase = hits.map(hit => hit.name.toLowerCase());

      const begin = [];
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
          const topMatches = uniqueMatches
            .map(personalId => {
              const count = peopleIds.filter(id => personalId === id);
              return {
                id: personalId,
                count: count.length
              };
            })
            .sort((person, prev) => { if ( person.count < prev.count ) { return -1; }})
            .filter(person => {
              if (person.count === hits.length) {
                return true;
              }
            })
            .map(person => person.id);

          if (topMatches.length === 0) {
          }

          const matchedPeople = People.getPeopleData(topMatches, db);
          matchedPeople.then(people => {
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
                  const totalPeople = 13; // @TODO make this dynamic
                  const unique = Math.round((tag.people.length / totalPeople) * 100);

                  const fakeActivity = Math.floor(Math.random() * 50);
                  const fakeRanking = Math.floor(Math.random() * 100);

                  const knolageItem = {};
                  if (tag._id) { knolageItem.tagId = tag._id; }
                  if (tag.name) { knolageItem.name = tag.name; }
                  if (tag.fullName) { knolageItem.fullName = tag.fullName; }
                  if (tag.type) { knolageItem.type = tag.type; }
                  if (tag.category) { knolageItem.category = tag.category; }
                  if (tag.subCategory) { knolageItem.subCategory = tag.subCategory; }

                  knolageItem.unique = unique;
                  knolageItem.lastActivity = fakeActivity;
                  knolageItem.ranking = fakeRanking;
                  // tag.rank = ;

                  people[personalId].knolage.push(knolageItem);
                break;
                case 'project':
                  const fakeProjectActivity = Math.floor(Math.random() * 50);
                  const fakeHours = Math.floor(Math.random() * 100);

                  const projectItem = {};
                  if (tag._id) { projectItem.tagId = tag._id; }
                  if (tag.name) { projectItem.name = tag.name; }
                  if (tag.fullName) { projectItem.fullName = tag.fullName; }
                  if (tag.type) { projectItem.type = tag.type; }
                  projectItem.lastActivity = fakeProjectActivity;
                  projectItem.hours = fakeHours;

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
            person.knolage = People.attachKnolage(person.knolage);
          });

          resolve(people);
        });
    });
  }

  static attachKnolage(knolage) {
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
        name: knolagePoint.fullName ? knolagePoint.fullName : knolagePoint.name,
        hash: knolagePoint.name,
        unique: knolagePoint.unique,
        lastActivity: knolagePoint.lastActivity,
        ranking: knolagePoint.ranking,
        tagId: knolagePoint.tagId
      });
    });
    return newKnolage;
  }
}

module.exports = People;
