document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const overlay = document.getElementById('overlay');
    const closeButton = document.getElementById('close-overlay');
    const discoButton = document.getElementById('action-button');
    const music = document.getElementById('disco-music'); // Get the audio element
    const container = document.getElementById('container');
    let isDiscoActive = false;
    let laserInterval, rotationInterval;

    // Array of capybara images
    const capybaraImages = [
        "capi1.gif",
        "capi2.gif",
        "capi3.gif",
        "capi4.jpg",
        "capi5.jpg",
        "capi.jpg",
    ];

    // Function to create a single laser beam
    function createLaser() {
        const laser = document.createElement('div');
        laser.classList.add('laser-beam');
        container.appendChild(laser);

        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        const randomAngle = Math.random() * 360;
        const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

        laser.style.top = `${randomY}px`;
        laser.style.left = `${randomX}px`;
        laser.style.transform = `rotate(${randomAngle}deg)`;
        laser.style.background = randomColor;
        laser.style.boxShadow = `0 0 20px ${randomColor}, 0 0 40px ${randomColor}`;

        setTimeout(() => {
            laser.style.opacity = '0';
            setTimeout(() => laser.remove(), 300);
        }, 300);
    }

    // Function to start the disco party
    function startDiscoParty() {
        // Start playing music
        music.play();

        // Start creating lasers
        laserInterval = setInterval(createLaser, 100); // Create lasers every 100ms

        // Start rotating the disco ball
        rotationInterval = setInterval(() => {
            const rotatingImage = document.getElementById('rotating-image');
            rotatingImage.style.transform = `translate(-50%, -50%) rotate(${(parseInt(rotatingImage.style.transform.replace(/[^0-9]/g, '')) || 0) + 1}deg)`;
        }, 100);

        // Hide the overlay when the party starts
        overlay.style.display = 'none';
    }

    // When the button in the overlay is clicked, start the disco party
    closeButton.addEventListener('click', startDiscoParty);

    // Handle button click to toggle disco party
    discoButton.addEventListener('click', () => {
        if (isDiscoActive) {
            // Stop disco party
            clearInterval(laserInterval);
            clearInterval(rotationInterval);
            music.pause(); // Stop the music
            isDiscoActive = false;
        } else {
            // Start disco party
            startDiscoParty();
            isDiscoActive = true;
        }
    });

    // Function to add a random capybara
    // Function to add a random capybara
    let addCapybaraButton = document.getElementById('add-capybara');
    addCapybaraButton.addEventListener('click', () => {
        // Create a new capybara image
        const capybaraImg = document.createElement('img');
        capybaraImg.src = capybaraImages[Math.floor(Math.random() * capybaraImages.length)];
        capybaraImg.classList.add('capybara');

        // Set initial random position
        capybaraImg.style.position = 'absolute'; // Ensure it's positioned absolutely
        capybaraImg.style.top = `${Math.random() * window.innerHeight}px`;
        capybaraImg.style.left = `${Math.random() * window.innerWidth}px`;

        // Set random size
        const randomSize = Math.random() * 100 + 50; // Size between 50px and 150px
        capybaraImg.style.width = `${randomSize}px`;
        capybaraImg.style.height = `${randomSize}px`;

        // Set random rotation
        const randomRotation = Math.random() * 360; // Rotation between 0° and 360°
        capybaraImg.style.transform = `rotate(${randomRotation}deg)`;

        // Add the capybara image to the container
        container.appendChild(capybaraImg);

        // Make capybara move, rotate, change size, and image continuously
        setInterval(() => {
            // Move capybara to a new random position
            capybaraImg.style.top = `${Math.random() * window.innerHeight}px`;
            capybaraImg.style.left = `${Math.random() * window.innerWidth}px`;

            // Apply random rotation to create spinning effect
            const randomRotation = Math.random() * 360;
            capybaraImg.style.transform = `rotate(${randomRotation}deg)`;

            // Apply random size for a dynamic effect
            const randomSize = Math.random() * 100 + 50; // Random size between 50px and 150px
            capybaraImg.style.width = `${randomSize}px`;
            capybaraImg.style.height = `${randomSize}px`;

            // Change to a random image every 2 seconds
            capybaraImg.src = capybaraImages[Math.floor(Math.random() * capybaraImages.length)];
        }, 1000); // Every 1 second
    });

});
