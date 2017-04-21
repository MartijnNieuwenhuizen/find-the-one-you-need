const categoriePanels = {

  openRelevant: () => {
    const tags = categoriePanels.getTags();
    const categories = categoriePanels.getCategoriesFromTags(tags);
    categoriePanels.showRelevant(categories);
    return categories;
  },

  getTags: () => {
    return Array.from(document.querySelectorAll('.buzzwords span'));
  },

  getCategoriesFromTags: (tags) => {
    const categories = tags.map(categorie => {
      const classes = categorie.className.split(' ');
      const categorieClasse = classes.filter(className => className.indexOf('--') >= 0).join('');
      const breakIndex = categorieClasse.indexOf('--') + 2;
      const categorieName = categorieClasse.slice(breakIndex);

      return categorieName;
    });

    return categories;
  },

  showRelevant: (categories) => {
    categoriePanels.hideAll();

    categories.forEach(category => {
      const htmlCaregory = Array.from(document.querySelectorAll(`.area--${category}`));
      htmlCaregory.forEach(area => {
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

module.exports = categoriePanels;
