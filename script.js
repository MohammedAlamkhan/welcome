const carousel = document.querySelector('.carousel-container');
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const link = card.getAttribute('data-link');

        // Prevent scrolling
        document.body.style.overflow = 'hidden';
        carousel.style.overflow = 'hidden';

        // Add flipping class to clicked card
        card.classList.add('flipping');

        // Make other cards disappear
        cards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.style.opacity = '0';
                otherCard.style.transition = 'opacity 0.1s ease-out';
            }
        });

        setTimeout(() => {
            window.location.href = link;
        }, 1000);
    });
});