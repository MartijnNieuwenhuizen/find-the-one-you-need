const ranking = {
  launch: function() {
    const rankingList = Array.from(document.querySelectorAll('.ranking'));

    rankingList.forEach(list => {
      const rankingItems = list.querySelectorAll('.ranking--item');

      rankingItems.forEach((item, i, arr) => {
        item.order = i;
        item.arr = arr;
        item.addEventListener('mouseenter', ranking.hover, true);
        item.addEventListener('mouseleave', ranking.leave, true);
        item.addEventListener('click', ranking.rank, true);
      });
    });
  },

  hover: function(e) {
    this.arr.forEach(item => {
      item.firstChild.src = './img/icons/star-white-empty.svg';
    });

    for (var i = 0; i < this.order + 1; i++) {
      this.arr[i].firstChild.src = './img/icons/star-white-full.svg';
    }
  },

  leave: function() {
    this.arr.forEach(item => {
      item.firstChild.src = `./img/icons/star-white-${item.firstChild.dataset.original}.svg`;
    });
  },

  rank: function() {
    let counter = 0;
    // for (var i = 0; i < this.order; i++) {
    //
    // }
    const animate = setInterval(() => {
      if (counter <= this.order) {
        this.arr[counter].classList.add('added');

        counter++;
      } else {
        clearInterval(animate);

        setTimeout(() => {
          this.arr.forEach(item => {
            item.classList.remove('added');
          });
        }, 300);
      }
    }, 100);
  }
};

module.exports = ranking;
