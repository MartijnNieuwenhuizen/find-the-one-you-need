const sliderList = document.querySelector('.slider--container');
const sliderItems = document.querySelectorAll('.slider--item');

// Get the total amount of slider
const totalAmountOfItems = sliderItems.length;
const marge = 16;
const itemWidth = sliderItems[0].clientWidth;

let sliderContainerWidth;
let itemsInScreen;
let sliderItemWidth;
let newItemMarge;

function constructSlider() {
  sliderContainerWidth = document.querySelector('.slider').clientWidth;
  itemsInScreen = Math.floor(sliderContainerWidth / (itemWidth + marge));
  sliderItemWidth = sliderContainerWidth / itemsInScreen;
  newItemMarge = (sliderItemWidth - itemWidth) / 2;
  sliderList.style.width = (totalAmountOfItems * sliderItemWidth) + 'px';

  sliderItems.forEach(item => {
    item.style.marginLeft = newItemMarge + 'px';
    item.style.marginRight = newItemMarge + 'px';
  });
}

window.onresize = function() {
  constructSlider();
};

function moveThrueKeys(e) {
  if (e.keyCode === 37 && counter !== 0) { moveLeft(); }
  if (e.keyCode === 39 && counter < (totalAmountOfItems - itemsInScreen)) { moveRight(); }
}


// create buttons
const buttonLeft = document.querySelector('.slider--left');
const buttonRight = document.querySelector('.slider--right');

// add eventListeners to the buttons
buttonLeft.addEventListener('click', moveLeft);
buttonRight.addEventListener('click', moveRight);

window.addEventListener('keyup', moveThrueKeys, false);

// Disable the left button on default
buttonLeft.disabled = true;

// Move the slider functions
let pos = 0;
let counter = 0;

sliderList.style.transition = '.3s transform';

function moveLeft(e) {
  pos += sliderItemWidth;
  let posPx = pos + 'px';
  sliderList.style.transform = 'translateX(' + posPx + ')';

  checkRightButton(this);
}
function moveRight(e) {
  pos -= sliderItemWidth;
  let posPx = pos + 'px';
  sliderList.style.transform = 'translateX(' + posPx + ')';

  checkLeftButton(this);
}

// Check if abutton is disabled and needs to be enabled
function checkButtonsDisabled() {
  if ( buttonLeft.disabled === true && counter !== 0 ) {
    buttonLeft.disabled = false;
  }
  if ( buttonRight.disabled === true && counter < (totalAmountOfItems - itemsInScreen) ) {
    buttonRight.disabled = false;
  }
}


function checkLeftButton(button) {
  counter += 1;
  if (button) {
    (totalAmountOfItems === itemsInScreen + counter)   ? button.disabled = true : checkButtonsDisabled();
  }

}

function checkRightButton(button) {
  counter -= 1;

  if (button) {
    counter === 0 ? button.disabled = true : checkButtonsDisabled();
  }
}

if ( totalAmountOfItems <= itemsInScreen ) {
  buttonRight.remove();
  buttonLeft.remove();
}
