const categories = {
  openRelevant: () => {

    const tags = categories.getTags();
    const tagsArray = tags.map(tag => {
      return tag.innerHTML.toLowerCase();
    });

    const relevantCategories = tagsArray
      .map(tag => Array.from(document.querySelectorAll(`#${tag}`)))
      .reduce((a, b) => a.concat(b) );


    const allCategories = Array.from(document.querySelectorAll('.category--item'));
    allCategories.forEach(category => {
      category.classList.add('category--hide');
    });

    relevantCategories.forEach(category => {
      category.classList.remove('category--hide');
      category.classList.add('pannel-open');
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

module.exports = categories;
