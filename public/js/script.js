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

    if (document.querySelector('.skills')) {
      var skills = require('./modules/skills');
      skills.visualize('');
    }

    if (document.querySelector('.match')) {
      var match = require('./modules/match');
      match.launch('');
    }

    if (document.querySelector('.result--see-all')) {
      var seeFullProfile = function seeFullProfile(e) {

        var parrent = this.parentElement;

        var hiddenAreas = Array.from(parrent.querySelectorAll('.area--hide'));
        hiddenAreas.forEach(function (area) {
          area.classList.remove('area--hide');

          var hiddenCategories = area.querySelectorAll('.category--hide');
          hiddenCategories.forEach(function (category) {
            category.classList.remove('category--hide');
          });
        });

        e.preventDefault();
      };

      var seeFullProfileButton = Array.from(document.querySelectorAll('.result--see-all'));
      seeFullProfileButton.forEach(function (button) {
        button.addEventListener('click', seeFullProfile, false);
      });
    }
  }, { "./modules/areas": 2, "./modules/categories": 3, "./modules/collapse": 4, "./modules/match": 5, "./modules/see-more": 6, "./modules/skills": 7 }], 2: [function (require, module, exports) {
    var areaPannels = {

      openRelevant: function openRelevant() {
        var tags = areaPannels.getTags();
        var areas = areaPannels.getAreasFromTags(tags);
        areaPannels.showRelevant(areas);
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

      showRelevant: function showRelevant(areas) {
        areaPannels.hideAll();

        areas.forEach(function (areaName) {
          var htmlArea = Array.from(document.querySelectorAll(".area--" + areaName));
          htmlArea.forEach(function (area) {
            area.classList.remove('area--hide');
          });
        });
      },

      hideAll: function hideAll() {
        var allAreas = Array.from(document.querySelectorAll('.area'));
        allAreas.forEach(function (area) {
          area.classList.add('area--hide');
        });
      }
    };

    module.exports = areaPannels;
  }, {}], 3: [function (require, module, exports) {
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
          subCategory.querySelector('.see-more').classList.add('category--hide');
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
  }, {}], 4: [function (require, module, exports) {
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
  }, {}], 5: [function (require, module, exports) {
    var match = {
      launch: function launch() {
        var matches = Array.from(document.querySelectorAll('.match'));

        matches.forEach(function (button) {
          button.addEventListener('click', match.remove, true);
          // panel.addEventListener('click', Pannels.toggle, true);
        });
      },

      remove: function remove(e) {
        var value = this.querySelector('.match--word').innerHTML;

        this.parentNode.removeChild(this);
        // console.log(this);

        var form = document.querySelector('.form');
        var input = form.querySelector('input');

        var inputValue = input.value;
        var inputWords = inputValue.split(' ');
        var newInputValue = inputWords.map(function (word) {
          if (word !== value) {
            return word;
          } else {
            return '';
          }
        }).join(' ');

        input.value = newInputValue;
        form.submit();
      }
    };

    module.exports = match;
  }, {}], 6: [function (require, module, exports) {
    var more = {
      listen: function listen() {
        var areas = Array.from(document.querySelectorAll('.area'));
        var visibleAreas = areas.filter(function (area) {
          return !area.classList.contains('area--hide');
        });

        visibleAreas.forEach(function (area) {
          var seeMore = area.querySelector('.see-more');

          if (seeMore) {
            seeMore.parentArea = area;
            seeMore.addEventListener('click', more.showAll, false);
          }
        });
      },

      showAll: function showAll(e) {

        var parentArea = this.parentArea;
        var items = Array.from(parentArea.querySelectorAll('.category--hide'));

        items.forEach(function (item) {
          item.classList.remove('category--hide');
        });

        e.preventDefault();
      }
    };

    module.exports = more;
  }, {}], 7: [function (require, module, exports) {
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
          var maxValue = 50;

          var fakeValue = Math.floor(Math.random() * (maxValue - 5 + 1) + 5);

          canvas.width = size;
          canvas.height = size;

          // let canvas rotate to 0%;
          ctx.translate(size / 2, size / 2);
          ctx.rotate(-90 * Math.PI / 180);
          ctx.translate(-size / 2, -size / 2);

          // of the arc calculations
          var full = 2 * Math.PI; // the 100% of the circle
          var one = full / 100; // 1% of the circle
          var percentage = fakeValue / maxValue * 100; // percentage the circle needs to be drawn
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

          point.innerHTML = fakeValue;

          point.appendChild(canvas);
        });
      }
    };

    module.exports = Skills;
  }, {}] }, {}, [1]);