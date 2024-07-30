if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration.scope);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    });
}

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

