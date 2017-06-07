const more = {
  listen: () => {
    const areas = Array.from(document.querySelectorAll('.sub-category'));

    areas.forEach(area => {
      const seeMore = area.querySelectorAll('.see-more');

      if (seeMore) {
        seeMore.forEach(button => {
          // const number = Number(button.querySelector('.see-more--number').innerHTML);
          // if ( number <= 1 ) {
            // button.classList.add('see-more--all');
          // } else {
            button.parentArea = area;
            button.addEventListener('click', more.showAll, false);
          // }
        });
      }
    });
  },

  showAll: function(e) {

    const parentArea = this.parentArea;
    const items = Array.from(parentArea.querySelectorAll('.category--hide'));
    items.forEach(item => {
      item.classList.remove('category--hide');
    });
    console.log(this.parentArea);
    if (this.parentArea.classList.contains('sub-category--hide')) {
      console.log('jaaaa');
      this.parentArea.classList.remove('sub-category--hide');
    }

    // const subItems = Array.from(parentArea.querySelectorAll('.sub-category--hide'));
    // subItems.forEach(subItem => {
    //   subItem.classList.remove('sub-category--hide');
    // });


    this.classList.add('see-more--all');

    const openPanels = parentArea.querySelectorAll('.pannel-open');
    if (!openPanels.length) {
      parentArea.querySelector('.category--item').classList.add('pannel-open');
    }

    e.preventDefault();
  }
};

module.exports = more;
