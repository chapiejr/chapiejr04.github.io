document.addEventListener('DOMContentLoaded', () => {
    // Booking Data
    const bookedDates = {
        single: [
            { start: new Date('2025-04-05'), end: new Date('2025-04-10') },
            { start: new Date('2025-04-15'), end: new Date('2025-04-20') }
        ],
        double: [
            { start: new Date('2025-04-07'), end: new Date('2025-04-12') }
        ],
        suite: [
            { start: new Date('2025-04-10'), end: new Date('2025-04-15') },
            { start: new Date('2025-04-22'), end: new Date('2025-04-25') }
        ]
    };

    // Navigation
    document.querySelectorAll('.nav-item, .logo').forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section') || 'home';
            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Book Form
    const bookForm = document.getElementById('book-form');
    const bookMsg = document.getElementById('book-msg');

    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        bookMsg.textContent = '';

        const roomType = document.getElementById('room-type').value;
        const checkin = new Date(document.getElementById('checkin').value);
        const checkout = new Date(document.getElementById('checkout').value);
        const guests = parseInt(document.getElementById('guests').value);

        if (!roomType || isNaN(checkin) || isNaN(checkout) || !guests || guests < 1) {
            bookMsg.textContent = 'Please fill all fields correctly.';
            bookMsg.style.color = 'red';
            return;
        }

        if (checkout <= checkin) {
            bookMsg.textContent = 'Checkout must be after checkin.';
            bookMsg.style.color = 'red';
            return;
        }

        const isBooked = bookedDates[roomType].some(booking => 
            checkin < booking.end && checkout > booking.start
        );

        bookMsg.textContent = isBooked 
            ? `Sorry, ${roomType} room is not available.` 
            : `${roomType.charAt(0).toUpperCase() + roomType.slice(1)} room is available!`;
        bookMsg.style.color = isBooked ? 'red' : 'green';
    });

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    const contactMsg = document.getElementById('contact-msg');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactMsg.textContent = '';

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            contactMsg.textContent = 'Please fill all fields.';
            contactMsg.style.color = 'red';
            return;
        }

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            contactMsg.textContent = 'Please enter a valid email.';
            contactMsg.style.color = 'red';
            return;
        }

        contactMsg.textContent = `Message sent! Thank you, ${name}.`;
        contactMsg.style.color = 'green';
        contactForm.reset();
    });
});
