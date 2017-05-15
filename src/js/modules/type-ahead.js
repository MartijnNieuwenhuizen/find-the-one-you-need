// Most of this code comes from the 30 days JavaScript cource by Wes Bos.
// https://javascript30.com/

const typeAhead = {

  launch: function() {
    // fetch?!
    fetch('/hits')
      .then(blob => blob.json())
      .then(data => {
        typeAhead.addEvents(data);
      })
      .catch(err => { console.log(`no data, error: ${err}`); });
  },

  displayMatches: function() {
    const content = this.value.split(' ');
    const lastWord = content[content.length - 1];

    if (lastWord.length > 2 && lastWord !== ' ') {
      const matchArray = typeAhead.findMatches(lastWord, this.names);

      const html = matchArray.map(word => {
        const regex = new RegExp(lastWord, 'gi');
        const kind = word.category || word.type;
        const possibleMatch = word.name.replace(regex, `<span class="suggestions--hl suggestions--${kind}">${lastWord}</span>`);
        return `
          <li class="suggestions--item">${possibleMatch}</li>
        `;
      }).join('');
    this.suggestions.innerHTML = html;
    }
  },

  findMatches: function(wordToMatch, cities) {
    return cities.filter(word => {
      // here we need to figure out if the city or state matches what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      return word.name.match(regex);
    });
  },

  addEvents: function(names) {
    const input = document.querySelector('.form--input');
    const suggestions = document.querySelector('.suggestions');
    input.names = names;
    input.suggestions = suggestions;
    input.addEventListener('change', typeAhead.displayMatches);
    input.addEventListener('keyup', typeAhead.displayMatches);
  }
};

module.exports = typeAhead;
