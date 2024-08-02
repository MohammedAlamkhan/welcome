let lastActivity = Date.now();
let isLocked = true;

function showLockscreen() {
    document.body.classList.remove('unlocked');
    isLocked = true;
}

function hideLockscreen() {
    document.body.classList.add('unlocked');
    isLocked = false;
}

function checkInactivity() {
    if (!isLocked && Date.now() - lastActivity > 60000) {
        showLockscreen();
    }
}

function updateLastActivity() {
    lastActivity = Date.now();
}

function handleUnlock(e) {
    if (isLocked) {
        hideLockscreen();
        e.preventDefault(); // Prevent default action
    }
    updateLastActivity();
}

document.addEventListener('mousemove', updateLastActivity);
document.addEventListener('keydown', updateLastActivity);
document.addEventListener('scroll', updateLastActivity);

// Add click event listener for desktop users
document.addEventListener('click', handleUnlock);

// Touch event for mobile users
document.addEventListener('touchstart', function(e) {
    updateLastActivity();
    if (isLocked) {
        let startY = e.touches[0].clientY;
        
        document.addEventListener('touchmove', function moveHandler(e) {
            let currentY = e.touches[0].clientY;
            if (currentY < startY - 100) {
                hideLockscreen();
                document.removeEventListener('touchmove', moveHandler);
            }
        });
    }
});

window.addEventListener('load', showLockscreen);
setInterval(checkInactivity, 1000);


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

