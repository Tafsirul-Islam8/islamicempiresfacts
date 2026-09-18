// scrpit.js

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

// SLIDER FUNCTIONS!!!

const track = document.getElementById('sliderTrack');
        const dotItems = document.querySelectorAll('.dotItem');
        const totalSlides = 5;
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
            autoSlideInterval = setInterval(nextSlide, 5000);
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