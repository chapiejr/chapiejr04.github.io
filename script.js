// Toggle mobile menu
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Booking form submission (mock)
document.getElementById('booking-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    const userName = document.getElementById('name').value; // Get the user's name
    const result = document.getElementById('booking-result');

    if (new Date(checkIn) >= new Date(checkOut)) {
        result.innerHTML = '<p style="color: red;">Check-out date must be after check-in date.</p>';
    } else {
        result.innerHTML = `<p style="color: green;">Booking submitted successfully, ${userName}! </p>`;
    }
});

// Contact form submission (mock)
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent successfully! (This is a demo)');
});

// Modal functions for room details
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});