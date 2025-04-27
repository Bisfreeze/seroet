// Simple mobile menu toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('active');
    this.classList.toggle('active');
});

document.querySelector('.contact-form form').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form submit biasa

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Cek kalau ada field yang kosong
    if (name === '' || email === '' || message === '') {
        alert('Harap isi semua data terlebih dahulu!');
        return; // Stop proses kalo ada yang kosong
    }

    const phoneNumber = '6281818220405'; 
    const whatsappMessage = `Halo Seroet!%0A%0ASaya ingin bertanya.%0A%0A* Nama: ${name}%0A* Email: ${email}%0A* Pesan: ${message}%0A%0ATerima kasih!`;

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    window.open(whatsappLink, '_blank'); 
});


// BUAT TESTIMONI
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.carousel-button.right');
    const prevButton = document.querySelector('.carousel-button.left');
    const dotsNav = document.querySelector('.carousel-nav');
    const dots = Array.from(document.querySelectorAll('.carousel-indicator'));

    if (!track || slides.length === 0 || !nextButton || !prevButton || !dotsNav || dots.length === 0) {
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

        // AUTO SLIDE TESTIMONI
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
    }, 6000);
    
});
