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

if ( document.querySelector('.slider') ) {
  require('./modules/slider');
}

if ( document.querySelector('.skills') ) {
  const skills = require('./modules/skills');
  skills.visualize('');
}


if ( document.querySelector('.match') ) {
  const match = require('./modules/match');
  match.launch('');
}

// Quick fix to make the sentance
if (document.querySelector('.buzzwords')) {

  const buzzwordsSentance = document.querySelector('.buzzwords');
  buzzwordsSentance.addEventListener('click', function(e) {
    const input = document.querySelector('.form input');
    input.focus();
  }, true);

}
