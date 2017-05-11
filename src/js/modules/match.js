const match = {
  launch: () => {
    const matches = Array.from(document.querySelectorAll('.match'));

    matches.forEach(button => {
      button.addEventListener('click', match.remove, true);
    });
  },

  remove: function(e) {
    console.log('e');
    console.dir(e);
    console.log('clicked!');
    const value = this.querySelector('.match--word').innerHTML;
    // console.log(this);

    const form = document.querySelector('.form');
    const input = form.querySelector('input');

    const inputValue = input.value;
    const inputWords = inputValue.split(' ');
    const newInputValue = inputWords.filter(word => {
      if ( word !== value && word.length > 0 ) {
        return word;
      }
    }).join(' ');

    input.value = newInputValue;
    this.parentNode.removeChild(this);
    form.submit();
  }
};

module.exports = match;
