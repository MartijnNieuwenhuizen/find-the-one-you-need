class Activity {
  static add(people, db) {
    return new Promise(function(resolve, reject) {

      const today = new Date(2017, 10, 7);

      const activities = db.get('activities');
      activities.find({})
        .each(personalActivity => {
          const personalId = personalActivity.personalId;
          const rightPerson = people.filter(person => String(person._id) === String(personalId));

          if (rightPerson.length) {
            rightPerson[0].knolage.forEach((personalKnolage, pk) => {
              personalKnolage.subArea.forEach((subAreas, s) => {
                subAreas.points.forEach((skill, a) => {

                  const skillActivity = personalActivity.activities.filter( activity => String(activity.tagId) === String(skill.tagId) );
                  // const amountOfActivity = skillActivity[0].activity.length;
                  const getUnique = (tag, i, arr) => arr.indexOf(tag) === i;
                  const largeToSmall = (x, z) => z - x;
                  const months = skillActivity[0].activity
                    .map(singleActivity => Number(new Date(singleActivity.date).getMonth() + 1) )
                    .filter(getUnique)
                    .sort(largeToSmall);
                  skill.activeMonths = months;


                  const lastMonthNumber = Math.max.apply(Math, months);
                  const getDatesFromLatestMonths = singleActivity => (Number(new Date(singleActivity.date).getMonth() + 1) === lastMonthNumber );
                  const dateDifferance = singleActivity => parseInt((new Date(singleActivity.date) - today) / (1000 * 60 * 60 * 24), 10);
                  const negativeToPositive = singleActivity => Math.abs(singleActivity);
                  const smallToLarge = (x, z) => x - z;
                  const getSmallestDifferance = ((days, i) => { if (i === 0) { return days; }});

                  // Calculate differance in day's. if Today is 14 Nov 2017!!!
                  const lastActivity = skillActivity[0].activity
                    .filter(getDatesFromLatestMonths)
                    .map(dateDifferance)
                    .map(negativeToPositive)
                    .sort(smallToLarge)
                    .filter(getSmallestDifferance);

                  skill.lastActivity = lastActivity;
                });
              });
            });
          }
        })
        .then(() => {
          resolve(people);
        });
    });
  }
}

module.exports = Activity;
