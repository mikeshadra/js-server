const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Configure the transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use any email service you prefer
  auth: {
    user: 'mikeshadra@gmail.com', // replace with your email
    pass: 'mist2541' // replace with your email password
  }
});

app.post('/send-message', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'your-email@gmail.com', // replace with your email
    subject: `New message from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending message');
    }
    res.status(200).send('Message sent successfully');
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
