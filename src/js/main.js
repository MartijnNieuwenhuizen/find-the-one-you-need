if (document.querySelector('.category')) {
  const Pannels = require('./modules/collapse');
  Pannels.launch();
}

if (document.querySelector('.result')) {
  const areas = require('./modules/areas');
  const categories = require('./modules/categories');
  const more = require('./modules/see-more');

  areas.openRelevant();
  categories.openRelevant();
  more.listen();
}
