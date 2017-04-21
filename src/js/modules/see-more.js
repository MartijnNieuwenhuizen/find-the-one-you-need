const more = {
  listen: () => {
    const areas = Array.from(document.querySelectorAll('.area'));
    const visibleAreas = areas.filter(area => !area.classList.contains('area--hide'));

    visibleAreas.forEach(area => {
      const seeMore = area.querySelector('.see-more');

      seeMore.parentArea = area;
      seeMore.addEventListener('click', more.showAll, false);
    })
  },

  showAll: function(e) {

    const parentArea = this.parentArea;
    const items = Array.from(parentArea.querySelectorAll('.category--hide'));

    items.forEach(item => {
      console.log(item);
      item.classList.remove('category--hide');
    });

    e.preventDefault();
  }
};

module.exports = more;
