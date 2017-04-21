const categories = {
  openRelevant: () => {
    const tags = categories.getTags();
    const relevantCategories = categories.getRelevantFromTags(tags);

    categories.hideAll();
    categories.showAllRelevant(relevantCategories);

    const subCategories = categories.getSubCategories();
    categories.closeUnrelevantSubCategories(subCategories);
  },

  getRelevantFromTags: (tags) => {
    const relevantCategories = tags
      .map(tag => Array.from(document.querySelectorAll(`#${tag}`)))
      .reduce((a, b) => a.concat(b) );

    return relevantCategories;
  },

  hideAll: () => {
    const allCategories = Array.from(document.querySelectorAll('.category--item'));
    allCategories.forEach(category => {
      category.classList.add('category--hide');
    });
  },

  showAllRelevant: (relevantCategories) => {
    relevantCategories.forEach(category => {
      category.classList.remove('category--hide');
      category.classList.add('pannel-open');
    });
  },

  getSubCategories: () => {
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

    return subCategoriesNeedClose;
  },

  closeUnrelevantSubCategories: (subCategoriesNeedClose) => {
    subCategoriesNeedClose.forEach(subCategory => {
      console.log('subCategory: ', subCategory);
      subCategory.querySelector('.category--title').classList.add('category--hide');
    });
  },

  getTags: () => {
    const tags = Array.from(document.querySelectorAll('.buzzwords span'));
      const tagsArray = tags.map(tag => {
      return tag.innerHTML.toLowerCase();
    });
    return tagsArray;
  }
};

module.exports = categories;
