class Activity {
  static add(people, db) {
    return new Promise(function(resolve, reject) {

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
                  const months = skillActivity[0].activity
                    .map(singleActivity => Number(new Date(singleActivity.date).getMonth() + 1) )
                    .filter(getUnique);

                    skill.activeMonths = months;
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
