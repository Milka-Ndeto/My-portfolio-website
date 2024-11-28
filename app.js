const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize the Express app
const app = express();

// Use body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JavaScript) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle contact form submission
app.post('/submit-contact-form', (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    // Validate form fields
    if (!name || !email || !phone || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Set up the Nodemailer transporter (using Gmail in this example)
    const transporter = nodemailer.createTransport({
        service: 'gmail', // You can change this to another mail service if necessary
        auth: {
            user: 'your-email@gmail.com',  // Replace with your email address
            pass: 'your-email-password'    // Replace with your email password or app-specific password
        }
    });

    // Set up the email options
    const mailOptions = {
        from: email,  // The sender's email (from the form input)
        to: 'your-email@gmail.com',  // Your email address where the form submission will be sent
        subject: `New Contact Form Submission: ${subject}`,
        text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Subject: ${subject}
            Message: ${message}
        `
    };

    // Send the email using the transporter
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send the message' });
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({ success: 'Message sent successfully' });
        }
    });
});

// Set the port for the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
