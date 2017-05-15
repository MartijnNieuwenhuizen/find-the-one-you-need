const typeAhead = {

  launch: function() {
    // fetch?!
    fetch(`/hits`)
      .then(blob => blob.json())
      .then(data => {
        const names = data.map(item => item.name);

        // Add eventListener to the input

        typeAhead.addEvents(names);
      })
      .catch(err => { console.log(`no data, error: ${err}`); });
  },

  displayMatches: function() {
    const content = this.value.split(' ');
    const lastWord = content[content.length - 1];

    if (lastWord.length > 2 && lastWord !== ' ') {
      const matchArray = typeAhead.findMatches(lastWord, this.names);

      const html = matchArray.map(word => {
        // word.inputValue = lastWord;
        const regex = new RegExp(lastWord, 'gi');
        // const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        // const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        const possibleMatch = word.replace(regex, `<span class="suggestions--hl">${lastWord}</span>`);
        return `
          <li class="suggestions--item">
            <span>${possibleMatch}</span>
          </li>
        `;
      }).join('');
    this.suggestions.innerHTML = html;
    }
  },

  findMatches: function(wordToMatch, cities) {
    return cities.filter(word => {
      // here we need to figure out if the city or state matches what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      return word.match(regex);
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
