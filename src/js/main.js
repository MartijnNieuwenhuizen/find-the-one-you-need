if (document.querySelector('.category')) {
  const Pannels = require('./modules/collapse');
  Pannels.launch();
}

if (document.querySelector('.result')) {
  const categoriePanels = require('./modules/categories');
  const areas = require('./modules/areas');

  const categories = categoriePanels.openRelevant();
  areas.openRelevant(categories);
}
