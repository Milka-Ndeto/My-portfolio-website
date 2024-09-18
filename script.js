document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                window.scroll({
                    top: targetSection.offsetTop - 50, // Adjust the offset as needed
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation before submission
    const form = document.querySelector('#contact form');
    form.addEventListener('submit', function (e) {
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const message = document.querySelector('#message').value;

        // Basic validation
        if (!name || !email || !message) {
            e.preventDefault(); // Stop the form from submitting
            alert('Please fill in all fields.');
        } else if (!validateEmail(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
