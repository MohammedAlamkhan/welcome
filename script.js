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

const facts = [
    "Mumbai was originally a cluster of seven islands! 🌴🌴",
    "'Bom Baim,' meaning 'Good Bay' in Portuguese, is the origin of Mumbai's former name, Bombay. 🇵🇹",
    "Mumbai's dabbawalas deliver around 200,000 lunch boxes every day with incredible accuracy! 🍱",
    "The Bandra-Worli Sea Link's steel wires measure a length equal to the Earth's circumference. 🌐",
    "Mumbai's film industry, Bollywood, produces over 1000 films annually, making it the largest in the world. 🎬",
    "Mumbai never sleeps, earning it the nickname 'The City That Never Sleeps.' 💤❌",
    "The local trains are Mumbai's lifeline, carrying millions of passengers daily. 🚆",
    "The Gateway of India is a historic monument and popular tourist attraction in Mumbai. 🇮🇳🗽",
    "Vada Pav, often called Mumbai's burger, is a popular street food. 🍔",
    "Marine Drive, known as the Queen's Necklace, is famous for its stunning nighttime view. 👑📿",
    "Chhatrapati Shivaji Terminus, a historic railway station in Mumbai, is a UNESCO World Heritage Site. 🚉🏛️",
    "Auto rickshaws are an iconic mode of transportation in Mumbai. 🚖",
    "Street shopping at Colaba Causeway offers a vibrant and bustling experience. 🛍️",
    "Mumbai is known as the City of Dreams, attracting people from all over India. 🌃✨",
    "The city's nightlife is lively and diverse, offering something for everyone. 🌙🎉",
    "Mumbai is home to some of India's richest individuals and luxurious residences. 🏡💰",
    "The Elephanta Caves, located near Mumbai, are ancient rock-cut temples and a UNESCO World Heritage Site. 🗿",
    "Mumbai's dabbawalas are famous for their punctuality and efficiency. ⏰",
    "The city's beaches are often crowded with locals and tourists alike. 🏖️👫",
    "Mumbai's monsoon rains are legendary, often causing flooding and disruptions. ☔🌧️",
    "The city's skyline is dotted with high-rise buildings and skyscrapers. 🏙️",
    "Chowpatty Beach is a popular spot for locals to relax and enjoy street food. 🏖️",
    "Haji Ali Dargah, situated on an islet, is a renowned mosque and tomb. 🌊🕌",
    "Mumbai's street food scene is famous for its variety and flavors. 🍛",
    "Chhatrapati Shivaji Terminus is a UNESCO World Heritage Site and a historic landmark. 🌍",
    "Leopold Café, established in 1871, is a historic and iconic eatery in Mumbai. ☕",
    "The Mumbai Metro provides an efficient and modern mode of transportation. 🚇",
    "Ganesh Chaturthi is celebrated with grand processions and festivities in Mumbai. 🐘🎉",
    "The Kala Ghoda Arts Festival is a vibrant celebration of arts and culture. 🎨",
    "The Taj Mahal Palace Hotel is an iconic luxury hotel in Mumbai. 🏨"
];


function changeFact() {
    const factElement = document.getElementById('mumbai-fact');
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    factElement.textContent = randomFact;
}

// Change fact every 10 seconds
setInterval(changeFact, 10000);

// Initial fact change
changeFact();

document.addEventListener('DOMContentLoaded', (event) => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
  
    // Check for saved theme preference or use default
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      body.classList.add(currentTheme);
    }
  
    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
      if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', '');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }
    });
  });