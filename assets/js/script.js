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

setInterval(() => {
  const ev = new Event('click');
  document.querySelector('#testiNext').dispatchEvent(ev);
}, 5000)

var cooldown = false;
const RECHARGE_TIME = 1000; //ms
function startCooldown() {
  cooldown = true;
  setTimeout (function(){ cooldown = false}, RECHARGE_TIME);
}

document.querySelector('#testiPrev').addEventListener('click', async () => {
  if(!cooldown) {
    await startCooldown();
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
  }
})

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
})

// Navbar
window.addEventListener('scroll', (e) => {
  if(window.scrollY > 88) {
    document.querySelector('nav').classList.add('scrolled');
    document.querySelector('.scrollToTop').style.display = 'block';
  } else if(window.scrollY <= 88) {
    document.querySelector('nav').classList.remove('scrolled');
    document.querySelector('.scrollToTop').style.display = 'none';
  }
})

document.querySelector('.burger').addEventListener('click', () => {
  document.querySelector('.nav-mobile').style.width = '100%'
})

document.querySelector('.close-btn').addEventListener('click', () => {
  document.querySelector('.nav-mobile').style.width = '0'
})

document.querySelector('.nav-mobile ul > li.product').addEventListener('click', () => {
  let dropdown = document.querySelector('.nav-mobile ul ul');
  if(dropdown.style.display === '' || dropdown.style.display === 'none') dropdown.style.display = 'block';
  else dropdown.style.display = 'none';
})