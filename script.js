const root = document.documentElement;
const carousselElementsDisplayed = getComputedStyle(root).getPropertyValue("--caroussel-elements-displayed");
const carousselContent = document.querySelector("ul.caroussel-content");

root.style.setProperty("--caroussel-elements", carousselContent.children.length);

for(let i=0; i<carousselElementsDisplayed; i++) {
  carousselContent.appendChild(carousselContent.children[i].cloneNode(true));
}

function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;
	    
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
	
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
	
    if (callNow) func.apply(context, args);
  };
};

setInterval(debounce(function() {
  let currCarousel = document.querySelector('.testi-carousel-cell.active');
  let nextSibling = currCarousel.nextElementSibling;
  if(!nextSibling) {
    nextSibling = currCarousel.parentElement.firstElementChild;
  }
  currCarousel.classList.add('right');
  currCarousel.addEventListener('animationend', () => {
    currCarousel.classList.remove('right');
    currCarousel.classList.remove('active');
    nextSibling.classList.add('active');
  })
}),5000)

document.querySelector('#testiPrev').addEventListener('click', debounce(() => {
  let currCarousel = document.querySelector('.testi-carousel-cell.active');
  let prevSibling = currCarousel.previousElementSibling;
  if(!prevSibling) {
    prevSibling = currCarousel.parentElement.lastElementChild;
  }
  currCarousel.classList.add('left');
  currCarousel.addEventListener('animationend', () => {
    currCarousel.classList.remove('left');
    currCarousel.classList.remove('active');
    prevSibling.classList.add('active');
  }, { once: true })
}, 250))

document.querySelector('#testiNext').addEventListener('click', async () => {
  if(!cooldown) {
    await startCooldown();
    let currCarousel = document.querySelector('.testi-carousel-cell.active');
    let nextSibling = currCarousel.nextElementSibling;
    if(!nextSibling) {
      nextSibling = currCarousel.parentElement.firstElementChild;
    }
    currCarousel.classList.add('right');
    currCarousel.addEventListener('animationend', () => {
      currCarousel.classList.remove('right');
      currCarousel.classList.remove('active');
      nextSibling.classList.add('active');
    }, { once: true })
  }
  currCarousel.classList.add('right');
  currCarousel.addEventListener('animationend', () => {
    currCarousel.classList.remove('right');
    currCarousel.classList.remove('active');
    nextSibling.classList.add('active');
  }, { once: true })
}, 250)