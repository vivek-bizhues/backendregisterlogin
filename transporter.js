// Configure Nodemailer for sending emails
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Your Email Service',
    auth: {
      user: 'your-email@example.com',
      pass: 'your-email-password',
    },
  });
  export default transporter