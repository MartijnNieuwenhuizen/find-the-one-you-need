const sliderList = document.querySelector('.slider--container');
const sliderItems = document.querySelectorAll('.slider--item');
const sliderContainer = document.querySelector('.slider');

// Get the total amount of slider
const totalAmountOfItems = sliderItems.length;

let itemWidth;
const marge = 16;

function calculateListWidth() {
  // Get the with of one item in the list
  itemWidth = sliderItems[0].offsetWidth;
  // set the width of the list to the width of all the elements combined
  sliderList.style.width = totalAmountOfItems * (itemWidth + marge) + 'px';
}
calculateListWidth();

let sliderShown;

function getAmountOfPeople() {
  if ( window.innerWidth < 960 ) {
    sliderShown = 1;
  }
  if ( window.innerWidth >= 960 ) {
    sliderShown = 2;
  }
  if ( window.innerWidth >= 1200 ) {
    sliderShown = 3;
  }
}
getAmountOfPeople();

function itemsWidth() {
  sliderItems.forEach(item => {
    item.style.width = (itemWidth - marge) + 'px';
  })
}
itemsWidth();

window.onresize = function() {
  getAmountOfPeople();
  calculateListWidth();
  itemsWidth();
};


// create buttons
const buttonLeft = document.querySelector('.slider--left');
const buttonRight = document.querySelector('.slider--right');

// add eventListeners to the buttons
buttonLeft.addEventListener('click', moveLeft);
buttonRight.addEventListener('click', moveRight);

// Disable the left button on default
buttonLeft.disabled = true;

// Move the slider functions
let pos = 0;
let counter = 0;

sliderList.style.transition = '.3s transform';

function moveLeft(e) {
  pos += itemWidth;
  let posPx = pos + 'px';
  sliderList.style.transform = 'translateX(' + posPx + ')';

  checkRightButton(this);
}
function moveRight(e) {
  pos -= itemWidth;
  let posPx = pos + 'px';
  sliderList.style.transform = 'translateX(' + posPx + ')';

  checkLeftButton(this);
}

// Check if abutton is disabled and needs to be enabled
function checkButtonsDisabled() {
  if ( buttonLeft.disabled === true && counter !== 0 ) {
    buttonLeft.disabled = false;
  }
  if ( buttonRight.disabled === true && counter < (totalAmountOfItems - sliderShown) ) {
    buttonRight.disabled = false;
  }
}


function checkLeftButton(button) {
  counter += 1;
  (totalAmountOfItems === sliderShown + counter)   ? button.disabled = true : checkButtonsDisabled();
}

function checkRightButton(button) {
  counter -= 1;
  counter === 0 ? button.disabled = true : checkButtonsDisabled();
}
