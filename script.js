const carousel = document.querySelector('.carousel-container');
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const link = card.getAttribute('data-link');

        // Prevent scrolling
        document.body.style.overflow = 'hidden';
        carousel.style.overflow = 'hidden';

        card.classList.add('flipping');
        card.classList.add('flipping');

        setTimeout(() => {
            window.location.href = link;
        }, 1000);
    });
});