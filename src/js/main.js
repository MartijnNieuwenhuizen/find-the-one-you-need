if ( document.querySelector('.category') ) {
  const Pannels = require('./modules/collapse');
  Pannels.launch();
}

if ( document.querySelector('.result') ) {
  const areas = require('./modules/areas');
  const categories = require('./modules/categories');
  const more = require('./modules/see-more');

  areas.openRelevant();
  categories.openRelevant();
  more.listen();
}

if ( document.querySelector('.skills') ) {
  const skills = require('./modules/skills');
  skills.visualize('');
}


if ( document.querySelector('.match') ) {
  const match = require('./modules/match');
  match.launch('');
}



if ( document.querySelector('.result--see-all') ) {

  function seeFullProfile(e) {

    const parrent = this.parentElement;

    const hiddenAreas = Array.from(parrent.querySelectorAll('.area--hide'));
    hiddenAreas.forEach(area => {
      area.classList.remove('area--hide');

      const hiddenCategories = area.querySelectorAll('.category--hide');
      hiddenCategories.forEach(category => {
        category.classList.remove('category--hide');
      })
    })




    e.preventDefault();
  }

  const seeFullProfileButton = Array.from(document.querySelectorAll('.result--see-all'));
  seeFullProfileButton.forEach(button => {
    button.addEventListener('click', seeFullProfile, false);
  });
}
