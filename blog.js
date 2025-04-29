document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('active');
    this.classList.toggle('active');
});

const modal = document.getElementById('articleModal');
const openModalBtn = document.getElementById('openArticleModal');
const closeModalBtn = document.getElementById('closeArticleModal');

// Open pop up
openModalBtn.addEventListener('click', function() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
});

// Tutup pop up
closeModalBtn.addEventListener('click', function() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Tutup pop up saat klik diluar box
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Tutup pop up pake esc keyboard
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.carousel-button.right');
    const prevButton = document.querySelector('.carousel-button.left');
    const dotsNav = document.querySelector('.carousel-nav');
    const dots = Array.from(document.querySelectorAll('.carousel-indicator'));
    
    if (!track || !slides.length || !nextButton || !prevButton || !dotsNav || !dots.length) {
        console.error('Carousel elements not found');
        return;
    }
    
    const slideWidth = slides[0].getBoundingClientRect().width;
    
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    
    slides.forEach(setSlidePosition);
    
    const moveToSlide = (track, currentSlide, targetSlide) => {
        const targetPosition = targetSlide.style.left;
        
        track.style.transform = 'translateX(-' + targetPosition + ')';
        
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };
    
    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    };
    
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        let prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        let prevDot = currentDot.previousElementSibling;
        
        if (!prevSlide) {
            prevSlide = slides[slides.length - 1];
            prevDot = dots[dots.length - 1];
        }
        
        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
    });
    
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        let nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        let nextDot = currentDot.nextElementSibling;
        
        if (!nextSlide) {
            nextSlide = slides[0];
            nextDot = dots[0];
        }
        
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    });
    
    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');
        
        if (!targetDot) return;
        
        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];
        
        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
    });

    let autoSlideInterval = setInterval(() => {
        const currentSlide = track.querySelector('.current-slide');
        let nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        let nextDot = currentDot.nextElementSibling;
    
        if (!nextSlide) {
            nextSlide = slides[0];
            nextDot = dots[0];
        }
    
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    }, 5000);
});