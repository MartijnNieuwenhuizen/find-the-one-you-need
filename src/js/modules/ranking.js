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
    // this
    console.log(this.order);
    console.log(this.arr);

    // for (var i = this.arr.length; i > this.arr.length; i--) {
    //   console.log('bla');
    // }
  }
};

module.exports = ranking;
