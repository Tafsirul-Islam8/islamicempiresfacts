/* (function(){
  const carousel = document.getElementById("carousel");
  const track = document.getElementById("track");
  let slides = Array.from(track.children);
  if(slides.length === 0)
    return;
  const firstClone = slides[0].cloneNode(true);
  track.appendChild(firstClone);
  slides = Array.from(track.children);
  let index = 0;
  let slidewidth = carousel.clientWidth;
  let isTrasitioning = false;
  const holdTime = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hold-time')) || 3000;
  const transitionTime = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--transition-time')) || 600;

  function updateSizes(){
    slidewidth = carousel.clientWidth;
    track.style.transition = "none";
    track.style.transform = `translateX(-${index * slidewidth}px)`;
    void track.offsetWidth;
    track.style.transition = `transform ${transitionTime}ms ease`;
  }

  function goNext(){
    if(isTrasitioning) return;
    isTrasitioning = true;
    index += 1;
    track.style.transform = `translateX(-${index * slidewidth}px)`;
    setTimeout(() =>{
      if(index === slides.length - 1){
        track.style.transition = `tranlateX(-${index * slidewidth}px)`;
        void track.offsetWidth;
        track.style.transition = `transform ${transitionTime}ms ease`;
      }
      isTrasitioning = false;
    }, transitionTime + 20);
  }
  let autoTimer;
  function startAuto(){
    stopAuto();
    autoTimer = setInterval(goNext, holdTime + transitionTime);
  }
  function stopAuto(){
    if(autoTimer){
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }
  function init(){
    carousel.setAttribute('data-ready', 'true');
    index = 0;
    track.style.transform = `tranlateX(0px)`;
    setTimeout(() => {
      updateSizes();
      startAuto();
    }, 50);
  }
  window.addEventListener('resize', () => {
    updateSizes();
  });
  const imgs = track.querySelectorAll('img');
  let loaded = 0;
  imgs.forEach(img => {
    if(img.complete) {
      loaded++;
    } else {
      img.addEventListener('load', ()=> {
        loaded++;
        if(loaded === imgs.length) updateSizes();
      });
      img.addEventListener('error', () => {
        loaded++;
        if(loaded === imgs.length) updateSizes();
      });
    }
  });
  init();
  document.addEventListener('visibilitychange', () =>{
    if(document.hidden) stopAuto(); else startAuto();
  });
})();
let index = 0;
function infiniteSlide(){
  index++;
  track.style.transform = `translateX(-${index * width}px);`
  if (index === totalSlides){
    index = 0;
    track.style.transition = "none";
    track.style.transform = "translateX(0px)";
    void track.offsetWidth;
    track.style.transition = "transform 0.6s ease";
  }
}
setInterval(infiniteSlide, 3600); */

document.querySelectorAll('#navbar_area .b').forEach(menu => {
  let hideTimer = null;

  menu.addEventListener('mouseenter', () => {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
    menu.classList.add('show'); // সাথে সাথে show (0.3s)
  });

  menu.addEventListener('mouseleave', () => {
    hideTimer = setTimeout(() => {
      menu.classList.remove('show'); // 2s পর hide (0.3s)
    }, 300);
  });
});

// Slider Loop
/* const track = document.querySelector(".track");
const slides = document.querySelectorAll(".slide");

let index = 0;
const slideCount = slides.length;
const intervalTime = 3000;

setInterval(() => {
  index++;
  track.style.transition = "transform 0.8s ease-in-out";
  track.style.transform = `translateX(-${index * 100}%)`;

  // যখন clone (শেষ) এ পৌঁছাবে
  if (index === slideCount - 1) {
    setTimeout(() => {
      track.style.transition = "none";
      index = 0;
      track.style.transform = `translateX(0)`;
    }, 800); // slide animation শেষ হওয়ার পর
  }
}, intervalTime);
const dots = document.querySelectorAll(".dot");
setInterval(() => {
  index++;
  if (index === slides.length) {
    index = 0;
  }
  updateSlider();
}, 3000); */
const track = document.getElementById('sliderTrack');
        const dotItems = document.querySelectorAll('.dotItem');
        const totalSlides = 4;
        let currentIndex = 0;
        let autoSlideInterval;
        function updateSlider(instant = false) {
            if (instant) {
                track.classList.add('noTransition');
            } else {
                track.classList.remove('noTransition');
            }
            // Move to next slide
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            // Update dots (only for original 4 images)
            dotItems.forEach((dot, index) => {
                if (index === (currentIndex % totalSlides)) {
                    dot.classList.add('activeDot');
                } else {
                    dot.classList.remove('activeDot');
                }
            });
        }
        function nextSlide() {
            currentIndex++;
            // Slide to the next image
            updateSlider(false);
            // When we reach the duplicate first image (index 4), reset to real first image (index 0)
            if (currentIndex === totalSlides) {
                setTimeout(() => {
                    currentIndex = 0;
                    updateSlider(true);
                }, 800); // Wait for transition to complete
            }
        }
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 4000);
        }
        // Click on dots to jump to specific slide
        dotItems.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider(false);
                clearInterval(autoSlideInterval);
                startAutoSlide();
            });
        });
        // Start the slider
        startAutoSlide();