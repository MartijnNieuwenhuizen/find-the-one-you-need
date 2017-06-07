const areaPannels = {

  openRelevant: () => {
    const tags = areaPannels.getTags();
    const areas = areaPannels.getAreasFromTags(tags);
    areaPannels.reorder(areas);

    const triggers = document.querySelectorAll('.area--subtitle-link');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', areaPannels.openSpesific, true);
    });
  },

  getTags: () => {
    return Array.from(document.querySelectorAll('.buzzwords button'));
  },

  getAreasFromTags: (tags) => {
    const areas = tags.map(area => {
      const classes = area.className.split(' ');
      const areaClasse = classes.filter(className => className.indexOf('--') >= 0).join('');
      const breakIndex = areaClasse.indexOf('--') + 2;
      const areaName = areaClasse.slice(breakIndex);

      return areaName;
    });

    return areas;
  },

  openSpesific: function(e) {
    this.parentElement.parentElement.parentElement.classList.toggle('pannel-open');

    e.preventDefault();
  },

  reorder: function(areas) {
    const areaItems = document.querySelectorAll('.knolage-areas--item');
    areas.reverse();

    areaItems.forEach(areaItem => {
      let reorderNeeded = true;

      areas.forEach(term => {
        if ( areaItem.classList.contains('area--' + term) ) {
          reorderNeeded = false;
        }
      });

      if ( reorderNeeded ) {
        const parrent = areaItem.parentNode;
        parrent.removeChild(areaItem);
        parrent.appendChild(areaItem);
      }
    });
  }
};

module.exports = areaPannels;
