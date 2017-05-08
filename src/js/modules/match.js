const match = {
  launch: () => {
    const matches = Array.from(document.querySelectorAll('.match'));

    matches.forEach(button => {
      button.addEventListener('click', match.remove, true);
      // panel.addEventListener('click', Pannels.toggle, true);
    });
  },

  remove: function(e) {
    const value = this.querySelector('.match--word').innerHTML;

    this.parentNode.removeChild(this);
    // console.log(this);

    const form = document.querySelector('.form');
    const input = form.querySelector('input');

    const inputValue = input.value;
    const inputWords = inputValue.split(' ');
    const newInputValue = inputWords.map(word => {
      if ( word !== value ) {
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
