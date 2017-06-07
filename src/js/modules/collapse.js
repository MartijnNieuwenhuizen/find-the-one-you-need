'use strict';

class Pannels {
  static launch() {
    const pannelLinks = Pannels.getLinks();
    Pannels.addClickBehavior(pannelLinks);
  }

  static getLinks() {
    return document.querySelectorAll('a.area--subtitle');
  }

  static addClickBehavior(panels) {
    panels.forEach(panel => {
      panel.addEventListener('click', Pannels.toggle, true);
    });
  }

  static getPannelCategory(parrentNode) {
    return parrentNode.dataset.categoryTitle;
  }

  static getAllPannelsWithCategory(categoryName) {
    return Array.from(document.querySelectorAll(`[data-category-title=${categoryName}]`));
  }

  static closeAllPannelsInCategory(pannelsInCategory) {
    pannelsInCategory.forEach(pannelCatagory => {
      const pannels = Array.from(pannelCatagory.children);

      pannels.forEach(pannel => {
        Pannels.close(pannel);
      });
    });
  }

  static openAllPannelsWithHash(hash) {
    const pannelsNeedOpening = Array.from(document.querySelectorAll(hash));

    pannelsNeedOpening.forEach(pannel => {
      Pannels.open(pannel);
    });
  }

  static toggle(e) {
    const pannelItem = this.parentNode;
    const pannel = pannelItem.parentNode;
    const hash = this.hash;

    const pannelCategory = Pannels.getPannelCategory(pannel);
    const pannelsInCategory = Pannels.getAllPannelsWithCategory(pannelCategory);
    Pannels.closeAllPannelsInCategory(pannelsInCategory);
    Pannels.openAllPannelsWithHash(hash);

    e.preventDefault();
  }

  static open(pannel) {
    pannel.classList.add('pannel-open');
  }
  static close(pannel) {
    if ( pannel.classList.contains('pannel-open') ) {
      pannel.classList.remove('pannel-open');
    }
  }
}

module.exports = Pannels;
