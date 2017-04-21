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
      var categoriePanels = require('./modules/categories');
      var areas = require('./modules/areas');

      var categories = categoriePanels.openRelevant();
      areas.openRelevant(categories);
    }
  }, { "./modules/areas": 2, "./modules/categories": 3, "./modules/collapse": 4 }], 2: [function (require, module, exports) {
    var areas = {
      openRelevant: function openRelevant(categories) {
        // .area--subtitle --> hash
        var relevantAreas = document.querySelectorAll('.area--subtitle');
        console.log('relevantAreas: ', relevantAreas);
      }
    };

    module.exports = areas;
  }, {}], 3: [function (require, module, exports) {
    var categoriePanels = {

      openRelevant: function openRelevant() {
        var tags = categoriePanels.getTags();
        var categories = categoriePanels.getCategoriesFromTags(tags);
        categoriePanels.showRelevant(categories);
        return categories;
      },

      getTags: function getTags() {
        return Array.from(document.querySelectorAll('.buzzwords span'));
      },

      getCategoriesFromTags: function getCategoriesFromTags(tags) {
        var categories = tags.map(function (categorie) {
          var classes = categorie.className.split(' ');
          var categorieClasse = classes.filter(function (className) {
            return className.indexOf('--') >= 0;
          }).join('');
          var breakIndex = categorieClasse.indexOf('--') + 2;
          var categorieName = categorieClasse.slice(breakIndex);

          return categorieName;
        });

        return categories;
      },

      showRelevant: function showRelevant(categories) {
        categoriePanels.hideAll();

        categories.forEach(function (category) {
          var htmlCaregory = Array.from(document.querySelectorAll(".area--" + category));
          htmlCaregory.forEach(function (area) {
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

    module.exports = categoriePanels;
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