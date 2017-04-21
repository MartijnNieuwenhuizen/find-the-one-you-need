const areaPannels = {

  openRelevant: () => {
    const tags = areaPannels.getTags();
    const areas = areaPannels.getAreasFromTags(tags);
    areaPannels.showRelevant(areas);
  },

  getTags: () => {
    return Array.from(document.querySelectorAll('.buzzwords span'));
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

  showRelevant: (areas) => {
    areaPannels.hideAll();

    areas.forEach(areaName => {
      const htmlArea = Array.from(document.querySelectorAll(`.area--${areaName}`));
      htmlArea.forEach(area => {
        area.classList.remove('area--hide');
      });
    });
  },

  hideAll: () => {
    const allAreas = Array.from(document.querySelectorAll('.area'));
    allAreas.forEach(area => {
      area.classList.add('area--hide');
    });
  }
};

module.exports = areaPannels;
