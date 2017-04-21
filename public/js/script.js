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

      areas.openRelevant();
      categories.openRelevant();
    }
  }, { "./modules/areas": 2, "./modules/categories": 3, "./modules/collapse": 4 }], 2: [function (require, module, exports) {
    var areaPannels = {

      openRelevant: function openRelevant() {
        var tags = areaPannels.getTags();
        var areas = areaPannels.getAreasFromTags(tags);
        areaPannels.showRelevant(areas);
      },

      getTags: function getTags() {
        return Array.from(document.querySelectorAll('.buzzwords span'));
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
        var tagsArray = tags.map(function (tag) {
          return tag.innerHTML.toLowerCase();
        });

        var relevantCategories = tagsArray.map(function (tag) {
          return Array.from(document.querySelectorAll("#" + tag));
        }).reduce(function (a, b) {
          return a.concat(b);
        });

        var allCategories = Array.from(document.querySelectorAll('.category--item'));
        allCategories.forEach(function (category) {
          category.classList.add('category--hide');
        });

        relevantCategories.forEach(function (category) {
          category.classList.remove('category--hide');
          category.classList.add('pannel-open');
        });

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

        subCategoriesNeedClose.forEach(function (subCategory) {
          console.log('subCategory: ', subCategory);
          subCategory.querySelector('.category--title').classList.add('category--hide');
        });
      },

      getTags: function getTags() {
        return Array.from(document.querySelectorAll('.buzzwords span'));
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
  }, {}] }, {}, [1]);