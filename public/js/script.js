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
      Pannels.collect();
    }
  }, { "./modules/collapse": 2 }], 2: [function (require, module, exports) {
    var Pannels = function () {
      function Pannels() {
        _classCallCheck(this, Pannels);
      }

      _createClass(Pannels, null, [{
        key: "collect",
        value: function collect() {
          var pannels = Array.from(document.querySelectorAll('.category--item'));
          var collapsablePannels = pannels.filter(function (pannel) {
            return pannel.id.length;
          });

          Pannels.addListener(collapsablePannels);
        }
      }, {
        key: "addListener",
        value: function addListener(panels) {
          panels.forEach(function (panel) {
            panel.addEventListener('click', Pannels.open, true);
          });
        }
      }, {
        key: "open",
        value: function open(e) {
          Pannels.closeAllOpen(this);
          this.classList.add('pannel-open');

          e.preventDefault();
        }
      }, {
        key: "close",
        value: function close(el) {
          el.classList.remove('pannel-open');
        }
      }, {
        key: "closeAllOpen",
        value: function closeAllOpen(clickedEl) {
          var pannelParrent = clickedEl.parentNode;
          var pannelSibblingsOpen = pannelParrent.querySelectorAll('.category--item');
          pannelSibblingsOpen.forEach(function (sibbling) {
            Pannels.close(sibbling);
          });
        }
      }]);

      return Pannels;
    }();

    module.exports = Pannels;

    // filter all the pannels that have an id


    // loop thrue each pannel
    // Add event listener
    // get the parrent
    // make all the elements in it collaps
    // make the clickable element pop open
  }, {}] }, {}, [1]);