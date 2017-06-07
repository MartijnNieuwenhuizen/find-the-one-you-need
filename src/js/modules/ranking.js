'use strict';

const ranking = {
  launch: function() {
    const rankingList = Array.from(document.querySelectorAll('.ranking'));
    console.log(rankingList);

    rankingList.forEach(list => {
      const rankingItems = list.querySelectorAll('.ranking--item');
      ranking.setPersonal(list);

      rankingItems.forEach((item, i, arr) => {
        item.order = i;
        item.arr = arr;
        item.addEventListener('mouseenter', ranking.hover, true);
        item.addEventListener('mouseleave', ranking.leave, true);
        item.addEventListener('click', ranking.conform, true);
      });
    });
  },

  hover: function() {
    this.arr.forEach(item => {
      item.classList.remove('show-star');
    });
    for (var i = 0; i < this.order + 1; i++) {
      this.arr[i].classList.add('show-star');
    }
  },

  leave: function() {
    this.arr.forEach(item => {
      item.classList.remove('show-star');
    });
  },

  conform: function(e) {
    const givenRanking = this.order + 1;
    const list = this.parentElement;
    const key = list.dataset.name;

    const storage = window.localStorage;
    // if ( !storage.ranking ) { storage.ranking = []; }
    storage.setItem(key, givenRanking);

    this.arr.forEach(item => {
      item.classList.remove('personal-ranking');
    });
    console.log(givenRanking);
    for (var i = 0; i < givenRanking; i++) {
      this.arr[i].classList.add('personal-ranking');
    }

    e.preventDefault();
  },

  setPersonal(item) {
    const name = item.dataset.name;
    const storage = window.localStorage;

    if ( storage.getItem(name) ) {
      const personalRanking = storage.getItem(name);
      console.log(personalRanking);

      const stars = item.children;

      for (var i = 0; i < personalRanking; i++) {
        stars[i].classList.add('personal-ranking');
      }
    }
  }
};

module.exports = ranking;
