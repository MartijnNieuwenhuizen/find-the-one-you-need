class Pannels {
  static collect() {
    const pannels = Array.from(document.querySelectorAll('.category--item'));
    const collapsablePannels = pannels.filter(pannel => pannel.id.length);

    Pannels.addListener(collapsablePannels);
  }

  static addListener(panels) {
    panels.forEach(panel => {
      panel.addEventListener('click', Pannels.open, true);
    });
  }

  static open(e) {
    Pannels.closeAllOpen(this)
    this.classList.add('pannel-open');

    e.preventDefault();
  }

  static close(el) {
    el.classList.remove('pannel-open');
  }

  static closeAllOpen(clickedEl) {
    const pannelParrent = clickedEl.parentNode;
    const pannelSibblingsOpen = pannelParrent.querySelectorAll('.category--item');
    pannelSibblingsOpen.forEach(sibbling => {
      Pannels.close(sibbling);
    });
  }
}

module.exports = Pannels;




// filter all the pannels that have an id


// loop thrue each pannel
// Add event listener
  // get the parrent
  // make all the elements in it collaps
  // make the clickable element pop open
