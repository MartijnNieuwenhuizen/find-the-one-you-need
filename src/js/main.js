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

if ( document.querySelector('.skill') ) {
  const skills = require('./modules/skills');
  skills.visualize();
}


if ( document.querySelector('.match') ) {
  const match = require('./modules/match');
  match.launch();
}

// Quick fix to make the sentance
if (document.querySelector('.buzzwords')) {

  const buzzwordsSentance = document.querySelector('.buzzwords');
  buzzwordsSentance.addEventListener('click', function(e) {
    const input = document.querySelector('.form input');
    input.focus();
  }, true);

}

if ( document.querySelector('.form--input') ) {
  const typeAhead = require('./modules/type-ahead');
  typeAhead.launch();
}


if ( document.querySelector('.remove') ) {
  const removeButtons = Array.from(document.querySelectorAll('.remove'));

  removeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const outerElement = this.parentElement.parentElement.parentElement;
      outerElement.classList.add('fade-out');

      e.preventDefault();
    });
  })
}

if (document.querySelector('.chart')) {
  require('./modules/barchart');
}


if ( document.querySelector('.ranking') ) {
  const ranking = require('./modules/ranking');
  ranking.launch();
}
