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

// Mock availability data (in a real app, this would come from a server)
const roomAvailability = {
    single: [
        { start: "2025-04-01", end: "2025-04-05" },
        { start: "2025-04-10", end: "2025-04-15" }
    ],
    double: [
        { start: "2025-04-03", end: "2025-04-07" }
    ],
    suite: [
        { start: "2025-04-05", end: "2025-04-12" }
    ]
};

// Check Availability
document.getElementById('check-availability').addEventListener('click', (e) => {
    e.preventDefault();
    const checkIn = document.getElementById('avail-check-in').value;
    const checkOut = document.getElementById('avail-check-out').value;
    const roomType = document.getElementById('avail-room-type').value;
    const result = document.getElementById('availability-result');

    if (!checkIn || !checkOut || !roomType) {
        result.innerHTML = '<p style="color: red;">Please fill in all fields.</p>';
        return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
        result.innerHTML = '<p style="color: red;">Check-out date must be after check-in date.</p>';
        return;
    }

    const bookedPeriods = roomAvailability[roomType] || [];
    const isAvailable = !bookedPeriods.some(period => {
        const bookedStart = new Date(period.start);
        const bookedEnd = new Date(period.end);
        const requestedStart = new Date(checkIn);
        const requestedEnd = new Date(checkOut);
        return (requestedStart <= bookedEnd && requestedEnd >= bookedStart);
    });

    result.innerHTML = isAvailable
        ? `<p style="color: green;">${roomType.charAt(0).toUpperCase() + roomType.slice(1)} Room is available for your dates!</p>`
        : `<p style="color: red;">Sorry, ${roomType.charAt(0).toUpperCase() + roomType.slice(1)} Room is not available for your dates.</p>`;
});
