'use strict';

const allPeople = db.get('people');
const allTags = db.get('tags');
const allActivities = db.get('activities');

const sources = ['Yammer', 'Slack', 'Bitbucket', 'Twitter', 'LinkedIn', 'Bitbucket'];
const projects = ['fleurop', 'nuon', 'transavia', 'klm', 'maxeda'];

allPeople.find({})
  .each(person => {

    const newInsert = {
      personalId: person._id,
      activities: []
    };

    allTags.find({})
      .each(tag => {
        if ( tag.people.includes(String(person._id)) ) {
          const userActivities = {
            tagId: tag._id,
            activity: []
          };

          const randomFor = Math.floor(Math.random() * 8) + 10;
          for (var i = 0; i < randomFor; i++) {
            const newActivity = {};

            const randomSource = sources[Math.floor(Math.random() * sources.length)];
            newActivity.source = randomSource;
            const randomDate = new Date(2017, Math.floor(Math.random() * 10), Math.floor(Math.random() * 27));
            newActivity.date = randomDate;

            if ( randomSource === 'Bitbucket' ) {
              const randomProject = projects[Math.floor(Math.random() * projects.length)];
              newActivity.project = randomProject;
            }
            userActivities.activity.push(newActivity);
          }
          newInsert.activities.push(userActivities);
        }
      }).then(response => {
        allActivities.insert(newInsert);
      })
  });
