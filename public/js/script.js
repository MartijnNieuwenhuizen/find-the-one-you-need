"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
      }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    if (document.querySelector('.category')) {
      var Pannels = require('./modules/collapse');
      Pannels.launch();
    }

    if (document.querySelector('.result')) {
      var areas = require('./modules/areas');
      var categories = require('./modules/categories');
      var more = require('./modules/see-more');

      areas.openRelevant();
      categories.openRelevant();
      more.listen();
    }

    if (document.querySelector('.slider')) {
      require('./modules/slider');
    }

    if (document.querySelector('.skill')) {
      var skills = require('./modules/skills');
      skills.visualize();
    }

    if (document.querySelector('.match')) {
      var match = require('./modules/match');
      match.launch();
    }

    // Quick fix to make the sentance
    if (document.querySelector('.buzzwords')) {

      var buzzwordsSentance = document.querySelector('.buzzwords');
      buzzwordsSentance.addEventListener('click', function (e) {
        var input = document.querySelector('.form input');
        input.focus();
      }, true);
    }

    if (document.querySelector('.form--input')) {
      var typeAhead = require('./modules/type-ahead');
      typeAhead.launch();
    }

    if (document.querySelector('.remove')) {
      var removeButtons = Array.from(document.querySelectorAll('.remove'));

      removeButtons.forEach(function (button) {
        button.addEventListener('click', function (e) {
          var outerElement = this.parentElement.parentElement.parentElement;
          outerElement.classList.add('fade-out');

          e.preventDefault();
        });
      });
    }

    if (document.querySelector('.chart')) {
      require('./modules/barchart');
    }

    if (document.querySelector('.ranking')) {
      var ranking = require('./modules/ranking');
      ranking.launch();
    }
  }, { "./modules/areas": 2, "./modules/barchart": 3, "./modules/categories": 4, "./modules/collapse": 5, "./modules/match": 6, "./modules/ranking": 7, "./modules/see-more": 8, "./modules/skills": 9, "./modules/slider": 10, "./modules/type-ahead": 11 }], 2: [function (require, module, exports) {
    var areaPannels = {

      openRelevant: function openRelevant() {
        var tags = areaPannels.getTags();
        var areas = areaPannels.getAreasFromTags(tags);
        areaPannels.reorder(areas);

        var triggers = document.querySelectorAll('.area--subtitle-link');
        triggers.forEach(function (trigger) {
          trigger.addEventListener('click', areaPannels.openSpesific, true);
        });
      },

      getTags: function getTags() {
        return Array.from(document.querySelectorAll('.buzzwords button'));
      },

      getAreasFromTags: function getAreasFromTags(tags) {
        var areas = tags.map(function (area) {
          var classes = area.className.split(' ');
          var areaClasse = classes.filter(function (className) {
            return className.indexOf('--') >= 0;
          }).join('');
          var breakIndex = areaClasse.indexOf('--') + 2;
          var areaName = areaClasse.slice(breakIndex);

          return areaName;
        });

        return areas;
      },

      openSpesific: function openSpesific(e) {
        this.parentElement.parentElement.parentElement.classList.toggle('pannel-open');

        e.preventDefault();
      },

      reorder: function reorder(areas) {
        var areaItems = document.querySelectorAll('.knolage-areas--item');
        areas.reverse();

        areaItems.forEach(function (areaItem) {
          var reorderNeeded = true;

          areas.forEach(function (term) {
            if (areaItem.classList.contains('area--' + term)) {
              reorderNeeded = false;
            }
          });

          if (reorderNeeded) {
            var parrent = areaItem.parentNode;
            parrent.removeChild(areaItem);
            parrent.appendChild(areaItem);
          }
        });
      }
    };

    module.exports = areaPannels;
  }, {}], 3: [function (require, module, exports) {
    console.log('Hurray');
  }, {}], 4: [function (require, module, exports) {
    var categories = {
      openRelevant: function openRelevant() {
        var tags = categories.getTags();
        var relevantCategories = categories.getRelevantFromTags(tags);

        categories.hideAll();
        categories.showAllRelevant(relevantCategories);

        var subCategories = categories.getSubCategories();
        categories.closeUnrelevantSubCategories(subCategories);
      },

      getRelevantFromTags: function getRelevantFromTags(tags) {
        var relevantCategories = tags.map(function (tag) {
          return Array.from(document.querySelectorAll("#" + tag));
        }).reduce(function (a, b) {
          return a.concat(b);
        });

        return relevantCategories;
      },

      hideAll: function hideAll() {
        var allCategories = Array.from(document.querySelectorAll('.category--item'));
        allCategories.forEach(function (category) {
          category.classList.add('category--hide');
        });
      },

      showAllRelevant: function showAllRelevant(relevantCategories) {
        relevantCategories.forEach(function (category) {
          category.classList.remove('category--hide');
          category.classList.add('pannel-open');
        });

        relevantCategories.forEach(function (item) {
          var parrent = item.parentElement;
          parrent.removeChild(item);
          parrent.appendChild(item);
        });
      },

      getSubCategories: function getSubCategories() {
        var subCategories = Array.from(document.querySelectorAll('.sub-category'));
        var subCategoriesNeedClose = subCategories.filter(function (subCategory) {
          var checker = true;
          var items = subCategory.querySelectorAll('.category--item');
          items.forEach(function (item) {
            if (!item.classList.contains('category--hide')) {
              checker = false;
            }
          });
          return checker;
        });

        return subCategoriesNeedClose;
      },

      closeUnrelevantSubCategories: function closeUnrelevantSubCategories(subCategoriesNeedClose) {
        subCategoriesNeedClose.forEach(function (subCategory) {
          // subCategory.querySelector('.see-more').classList.add('category--hide');
          subCategory.classList.add('sub-category--hide');

          // remove item from flow
          var parrent = subCategory.parentNode;
          parrent.removeChild(subCategory);
          parrent.appendChild(subCategory);
        });
      },

      getTags: function getTags() {
        var tags = Array.from(document.querySelectorAll('.match--word'));
        var tagsArray = tags.map(function (tag) {
          return tag.innerHTML.toLowerCase();
        });
        return tagsArray;
      }
    };

    module.exports = categories;
  }, {}], 5: [function (require, module, exports) {
    var Pannels = function () {
      function Pannels() {
        _classCallCheck(this, Pannels);
      }

      _createClass(Pannels, null, [{
        key: "launch",
        value: function launch() {
          var pannelLinks = Pannels.getLinks();
          Pannels.addClickBehavior(pannelLinks);
        }
      }, {
        key: "getLinks",
        value: function getLinks() {
          return document.querySelectorAll('a.area--subtitle');
        }
      }, {
        key: "addClickBehavior",
        value: function addClickBehavior(panels) {
          panels.forEach(function (panel) {
            panel.addEventListener('click', Pannels.toggle, true);
          });
        }
      }, {
        key: "getPannelCategory",
        value: function getPannelCategory(parrentNode) {
          return parrentNode.dataset.categoryTitle;
        }
      }, {
        key: "getAllPannelsWithCategory",
        value: function getAllPannelsWithCategory(categoryName) {
          return Array.from(document.querySelectorAll("[data-category-title=" + categoryName + "]"));
        }
      }, {
        key: "closeAllPannelsInCategory",
        value: function closeAllPannelsInCategory(pannelsInCategory) {
          pannelsInCategory.forEach(function (pannelCatagory) {
            var pannels = Array.from(pannelCatagory.children);

            pannels.forEach(function (pannel) {
              Pannels.close(pannel);
            });
          });
        }
      }, {
        key: "openAllPannelsWithHash",
        value: function openAllPannelsWithHash(hash) {
          var pannelsNeedOpening = Array.from(document.querySelectorAll(hash));

          pannelsNeedOpening.forEach(function (pannel) {
            Pannels.open(pannel);
          });
        }
      }, {
        key: "toggle",
        value: function toggle(e) {
          var pannelItem = this.parentNode;
          var pannel = pannelItem.parentNode;
          var hash = this.hash;

          var pannelCategory = Pannels.getPannelCategory(pannel);
          var pannelsInCategory = Pannels.getAllPannelsWithCategory(pannelCategory);
          Pannels.closeAllPannelsInCategory(pannelsInCategory);
          Pannels.openAllPannelsWithHash(hash);

          e.preventDefault();
        }
      }, {
        key: "open",
        value: function open(pannel) {
          pannel.classList.add('pannel-open');
        }
      }, {
        key: "close",
        value: function close(pannel) {
          if (pannel.classList.contains('pannel-open')) {
            pannel.classList.remove('pannel-open');
          }
        }
      }]);

      return Pannels;
    }();

    module.exports = Pannels;
  }, {}], 6: [function (require, module, exports) {
    var match = {
      launch: function launch() {
        var matches = Array.from(document.querySelectorAll('.match'));

        matches.forEach(function (button) {
          button.addEventListener('click', match.remove, true);
        });
      },

      remove: function remove(e) {
        var value = this.querySelector('.match--word').innerHTML;

        var form = document.querySelector('.form');
        var input = form.querySelector('input');

        var inputValue = input.value;
        var inputWords = inputValue.split(' ');
        var newInputValue = inputWords.filter(function (word) {
          if (word !== value && word.length > 0) {
            return word;
          }
        }).join(' ');

        input.value = newInputValue;
        this.parentNode.removeChild(this);
        form.submit();

        e.preventDefault();
      }
    };

    module.exports = match;
  }, {}], 7: [function (require, module, exports) {
    var ranking = {
      launch: function launch() {
        var rankingList = Array.from(document.querySelectorAll('.ranking'));
        console.log(rankingList);

        rankingList.forEach(function (list) {
          var rankingItems = list.querySelectorAll('.ranking--item');
          ranking.setPersonal(list);

          rankingItems.forEach(function (item, i, arr) {
            item.order = i;
            item.arr = arr;
            item.addEventListener('mouseenter', ranking.hover, true);
            item.addEventListener('mouseleave', ranking.leave, true);
            item.addEventListener('click', ranking.conform, true);
          });
        });
      },

      hover: function hover() {
        this.arr.forEach(function (item) {
          item.classList.remove('show-star');
        });
        for (var i = 0; i < this.order + 1; i++) {
          this.arr[i].classList.add('show-star');
        }
      },

      leave: function leave() {
        this.arr.forEach(function (item) {
          item.classList.remove('show-star');
        });
      },

      conform: function conform(e) {
        var givenRanking = this.order + 1;
        var list = this.parentElement;
        var key = list.dataset.name;

        var storage = window.localStorage;
        // if ( !storage.ranking ) { storage.ranking = []; }
        storage.setItem(key, givenRanking);

        this.arr.forEach(function (item) {
          item.classList.remove('personal-ranking');
        });
        console.log(givenRanking);
        for (var i = 0; i < givenRanking; i++) {
          this.arr[i].classList.add('personal-ranking');
        }

        e.preventDefault();
      },

      setPersonal: function setPersonal(item) {
        var name = item.dataset.name;
        var storage = window.localStorage;

        if (storage.getItem(name)) {
          var personalRanking = storage.getItem(name);
          console.log(personalRanking);

          var stars = item.children;

          for (var i = 0; i < personalRanking; i++) {
            stars[i].classList.add('personal-ranking');
          }
        }
      }
    };

    module.exports = ranking;
  }, {}], 8: [function (require, module, exports) {
    var more = {
      listen: function listen() {
        var areas = Array.from(document.querySelectorAll('.sub-category'));

        areas.forEach(function (area) {
          var seeMore = area.querySelectorAll('.see-more');

          if (seeMore) {
            seeMore.forEach(function (button) {
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

      showAll: function showAll(e) {

        var parentArea = this.parentArea;
        var items = Array.from(parentArea.querySelectorAll('.category--hide'));
        items.forEach(function (item) {
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

        var openPanels = parentArea.querySelectorAll('.pannel-open');
        if (!openPanels.length) {
          parentArea.querySelector('.category--item').classList.add('pannel-open');
        }

        e.preventDefault();
      }
    };

    module.exports = more;
  }, {}], 9: [function (require, module, exports) {
    var Skills = {
      visualize: function visualize() {

        var points = Array.from(document.querySelectorAll('.skill--score'));

        points.forEach(function (point) {
          var value = point.getAttribute('data-score');

          function color() {
            if (point.classList.contains('demo-fed')) {
              return '#F3B55B';
            } else if (point.classList.contains('demo-project')) {
              return '#84CBE7';
            }
          }

          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');

          var size = 64;
          // const maxValue = 50;
          var maxValue = 100;

          // const fakeValue = Math.floor(Math.random() * (maxValue - 5 + 1) + 5);

          canvas.width = size;
          canvas.height = size;

          // let canvas rotate to 0%;
          ctx.translate(size / 2, size / 2);
          ctx.rotate(-90 * Math.PI / 180);
          ctx.translate(-size / 2, -size / 2);

          // of the arc calculations
          var full = 2 * Math.PI; // the 100% of the circle
          var one = full / 100; // 1% of the circle
          var percentage = value / maxValue * 100; // percentage the circle needs to be drawn
          var endPoint = percentage * one; // value out of the percentage

          var x = 32;
          var y = 32;
          var r = 28;
          var startAngle = 0;
          var endAngle = endPoint;
          var anticlockwise = false;

          ctx.beginPath();
          ctx.arc(x, y, r, startAngle, endAngle, anticlockwise);
          ctx.strokeStyle = color();
          ctx.lineCap = 'round';
          ctx.lineWidth = 6;
          ctx.stroke();

          // point.innerHTML = value;

          point.appendChild(canvas);
        });
      }
    };

    module.exports = Skills;
  }, {}], 10: [function (require, module, exports) {
    var sliderList = document.querySelector('.slider--container');
    var sliderItems = document.querySelectorAll('.slider--item');

    // Get the total amount of slider
    var totalAmountOfItems = sliderItems.length;
    var marge = 16;
    var itemWidth = sliderItems[0].clientWidth;

    var sliderContainerWidth = void 0;
    var itemsInScreen = void 0;
    var sliderItemWidth = void 0;
    var newItemMarge = void 0;

    function constructSlider() {
      sliderContainerWidth = document.querySelector('.slider').clientWidth;
      itemsInScreen = Math.floor(sliderContainerWidth / (itemWidth + marge));
      sliderItemWidth = sliderContainerWidth / itemsInScreen;
      newItemMarge = (sliderItemWidth - itemWidth) / 2;
      sliderList.style.width = totalAmountOfItems * sliderItemWidth + 'px';

      sliderItems.forEach(function (item) {
        item.style.marginLeft = newItemMarge + 'px';
        item.style.marginRight = newItemMarge + 'px';
      });
    }

    constructSlider();

    window.onresize = function () {
      constructSlider();
    };

    function moveThrueKeys(e) {
      if (e.keyCode === 37 && counter !== 0) {
        moveLeft();
      }
      if (e.keyCode === 39 && counter < totalAmountOfItems - itemsInScreen) {
        moveRight();
      }
    }

    // create buttons
    var buttonLeft = document.querySelector('.slider--left');
    var buttonRight = document.querySelector('.slider--right');

    // add eventListeners to the buttons
    buttonLeft.addEventListener('click', moveLeft);
    buttonRight.addEventListener('click', moveRight);

    window.addEventListener('keyup', moveThrueKeys, false);

    // Disable the left button on default
    buttonLeft.disabled = true;

    // Move the slider functions
    var pos = 0;
    var counter = 0;

    sliderList.style.transition = '.3s transform';

    function moveLeft(e) {
      pos += sliderItemWidth;
      var posPx = pos + 'px';
      sliderList.style.transform = 'translateX(' + posPx + ')';

      checkRightButton(this);
    }
    function moveRight(e) {
      pos -= sliderItemWidth;
      var posPx = pos + 'px';
      sliderList.style.transform = 'translateX(' + posPx + ')';

      checkLeftButton(this);
    }

    // Check if abutton is disabled and needs to be enabled
    function checkButtonsDisabled() {
      if (buttonLeft.disabled === true && counter !== 0) {
        buttonLeft.disabled = false;
      }
      if (buttonRight.disabled === true && counter < totalAmountOfItems - itemsInScreen) {
        buttonRight.disabled = false;
      }
    }

    function checkLeftButton(button) {
      counter += 1;
      if (button) {
        totalAmountOfItems === itemsInScreen + counter ? button.disabled = true : checkButtonsDisabled();
      }
    }

    function checkRightButton(button) {
      counter -= 1;

      if (button) {
        counter === 0 ? button.disabled = true : checkButtonsDisabled();
      }
    }

    if (totalAmountOfItems <= itemsInScreen) {
      buttonRight.remove();
      buttonLeft.remove();
    }
  }, {}], 11: [function (require, module, exports) {
    // Most of this code comes from the 30 days JavaScript cource by Wes Bos.
    // https://javascript30.com/

    var typeAhead = {

      launch: function launch() {
        // fetch?!
        fetch('/hits').then(function (blob) {
          return blob.json();
        }).then(function (data) {
          typeAhead.addEvents(data);
        }).catch(function (err) {
          console.log("no data, error: " + err);
        });
      },

      displayMatches: function displayMatches() {
        var content = this.value.split(' ');
        var lastWord = content[content.length - 1];

        if (lastWord.length > 2 && lastWord !== ' ') {
          var matchArray = typeAhead.findMatches(lastWord, this.names);

          var html = matchArray.map(function (word) {
            var regex = new RegExp(lastWord, 'gi');
            var kind = word.category || word.type;
            var possibleMatch = word.name.replace(regex, "<span class=\"suggestions--hl suggestions--" + kind + "\">" + lastWord + "</span>");
            return "\n          <li class=\"suggestions--item\">" + possibleMatch + "</li>\n        ";
          }).join('');
          this.suggestions.innerHTML = html;
        }
      },

      findMatches: function findMatches(wordToMatch, cities) {
        return cities.filter(function (word) {
          // here we need to figure out if the city or state matches what was searched
          var regex = new RegExp(wordToMatch, 'gi');
          return word.name.match(regex);
        });
      },

      addEvents: function addEvents(names) {
        var input = document.querySelector('.form--input');
        var suggestions = document.querySelector('.suggestions');
        input.names = names;
        input.suggestions = suggestions;
        input.addEventListener('change', typeAhead.displayMatches);
        input.addEventListener('keyup', typeAhead.displayMatches);
      }
    };

    module.exports = typeAhead;
  }, {}] }, {}, [1]);