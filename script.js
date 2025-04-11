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
    const navItems = document.querySelectorAll('.nav-item, .logo');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section') || 'home';
            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Book Form
    const bookForm = document.getElementById('book-form');
    const paymentForm = document.getElementById('payment-form');
    const bookMsg = document.getElementById('book-msg');
    const paymentMsg = document.getElementById('payment-msg');

    if (bookForm) {
        bookForm.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();
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

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (checkin < today) {
                bookMsg.textContent = 'Check-in date cannot be in the past.';
                bookMsg.style.color = 'red';
                return;
            }

            const isBooked = bookedDates[roomType].some(booking => 
                checkin < booking.end && checkout > booking.start
            );

            if (isBooked) {
                bookMsg.textContent = `Sorry, ${roomType} room is not available.`;
                bookMsg.style.color = 'red';
            } else {
                bookMsg.textContent = `${roomType.charAt(0).toUpperCase() + roomType.slice(1)} room is available! Please enter payment details.`;
                bookMsg.style.color = 'green';
                bookForm.style.display = 'none';
                paymentForm.style.display = 'block';
                paymentMsg.textContent = '';
            }
        });
    }

    // Payment Form
    if (paymentForm) {
        paymentForm.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();
            paymentMsg.textContent = '';

            const cardholderName = document.getElementById('cardholder-name').value.trim();
            const cardNumber = document.getElementById('card-number').value.trim();
            const expiry = document.getElementById('expiry').value.trim();
            const cvv = document.getElementById('cvv').value.trim();

            if (!cardholderName || !cardNumber || !expiry || !cvv) {
                paymentMsg.textContent = 'Please fill all payment fields.';
                paymentMsg.style.color = 'red';
                return;
            }

            // Show processing message briefly
            paymentMsg.textContent = 'Processing payment...';
            paymentMsg.style.color = '#5a5a5a';

            // Simulate processing and show success
            setTimeout(() => {
                paymentMsg.textContent = `Payment successful! Booking confirmed! Thank you, ${cardholderName}.`;
                paymentMsg.style.color = 'green';

                // Record booking
                const roomType = document.getElementById('room-type').value;
                bookedDates[roomType].push({
                    start: new Date(document.getElementById('checkin').value),
                    end: new Date(document.getElementById('checkout').value)
                });

                // Reset forms
                paymentForm.reset();
                bookForm.reset();

                // Switch to booking form after a delay to show message
                setTimeout(() => {
                    paymentForm.style.display = 'none';
                    bookForm.style.display = 'block';
                    bookMsg.textContent = '';
                    paymentMsg.textContent = '';
                }, 2000); // 2-second delay to ensure message is visible
            }, 1000); // 1-second delay for "Processing payment..."

            // Optional backend logging
            fetch('http://localhost:3000/process-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cardholderName, cardNumber, expiry, cvv })
            }).catch(() => {});
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    const contactMsg = document.getElementById('contact-msg');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
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
    }
});
