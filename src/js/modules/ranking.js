const ranking = {
  launch: function() {
    const rankingList = Array.from(document.querySelectorAll('.ranking'));

    rankingList.forEach(list => {
      const rankingItems = list.querySelectorAll('.ranking--item');

      rankingItems.forEach((item, i, arr) => {
        item.order = i;
        item.arr = arr;
        item.addEventListener('mouseover', ranking.hover, true);
      });
    });
  },

  hover: function(e) {
    this.arr.forEach(item => {
      item.firstChild.src = 'http://localhost:3001/img/icons/star-white-empty.svg';
    });

    for (var i = 0; i < this.order + 1; i++) {
      this.arr[i].firstChild.src = 'http://localhost:3001/img/icons/star-white-full.svg';
    }
  }
};

module.exports = ranking;
