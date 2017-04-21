const areas = {
  openRelevant: (categories) => {

    const tags = areas.getTags();
    const tagsArray = tags.map(tag => {
      return tag.innerHTML.toLowerCase();
    });

    const relevantAreas = tagsArray
      .map(tag => Array.from(document.querySelectorAll(`#${tag}`)))
      .reduce((a, b) => a.concat(b) );


    const allAreas = Array.from(document.querySelectorAll('.category--item'));
    allAreas.forEach(area => {
      area.classList.add('category--hide');
    });

    relevantAreas.forEach(area => {
      area.classList.remove('category--hide');
      area.classList.add('pannel-open');
    });

    const subCategories = Array.from(document.querySelectorAll('.sub-category'));
    const subCategoriesNeedClose = subCategories.filter(subCategory => {
      let checker = true;
      const items = subCategory.querySelectorAll('.category--item');
      items.forEach(item => {
        if (!item.classList.contains('category--hide')) {
          checker = false;
        }
      });
      return checker;
    });

    subCategoriesNeedClose.forEach(subCategory => {
      console.log('subCategory: ', subCategory);
      subCategory.querySelector('.category--title').classList.add('category--hide');
    });



  },

  getTags: () => {
    return Array.from(document.querySelectorAll('.buzzwords span'));
  },
};

module.exports = areas;
