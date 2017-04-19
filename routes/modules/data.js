const data = {};
data.people = [
  {
    id: 1,
    name: {
      first: 'Martijn',
      last: 'Nieuwenhuizen',
      full: 'Martijn Nieuwenhuizen'
    },
    role: 'Front-end Developer',
    location: 'Amsterdam',
    currentLocation: 'Amsterdam',
  }, {
    id: 2,
    name: {
      first: 'Sandy',
      last: 'Smith',
      full: 'Sandy Smith'
    },
    role: 'Front-end Developer',
    location: 'Eindhoven',
    currentLocation: 'Amsterdam',
  }, {
    id: 3,
    name: {
      first: 'Bjurn',
      last: 'Kuipers',
      full: 'Bjurn Kuipers'
    },
    role: 'Senior Front-end Developer',
    location: 'Hoorn',
    currentLocation: 'Rotterdam',
  }
];

data.tags = [
  {
    name: 'nodejs',
    type: 'knolage',
    people: [1, 2]
  },
  {
    name: 'nuon',
    type: 'project',
    people: [1]
  }
];

data.meta = [
  {
    _id: 123,
    personId: 3,
    tagId: 345345,
    amountOfTweets: 4,
  }
];

data.projects = [
  {
    id: 35,
    projects: [
      {
        name: 'nuon',
        assignments: ['Login Scherm', 'Chatbot Logica', 'Vertalingen', 'Footer 2.0']
      }
    ]
  }
];













module.exports = data;
//   {
//     name: {
//       first: 'Martijn',
//       last: 'Nieuwenhuizen',
//       full: 'Martijn Nieuwenhuizen'
//     },
//     role: 'Front-end Developer',
//     location: 'Amsterdam',
//     currentLocation: 'Amsterdam',
//     knolageId: 1000
//   },
//   {
//     name: {
//       first: 'Sandy',
//       last: 'Smith',
//       full: 'Sandy Smith'
//     },
//     role: 'Front-end Developer',
//     location: 'Eindhoven',
//     currentLocation: 'Amsterdam',
//     knolageId: 1001
//   },
//   {
//     name: {
//       first: 'Bjurn',
//       last: 'Kuipers',
//       full: 'Bjurn Kuipers'
//     },
//     role: 'Senior Front-end Developer',
//     location: 'Hoorn',
//     currentLocation: 'Rotterdam',
//     knolageId: 1002
//   }
// ];
