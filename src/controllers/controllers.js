const nodemailer = require('nodemailer')
const Email = require('../models/model') 
require('dotenv').config({ path: '.env' })

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});


exports.sendeMail = async (req, res) => {
  try {
  const { to, subject, message } = req.body

  if (!to || !subject || !message) {
    return res.status(400).json({ error: 'Missing required Fields' });
  }

  // Setting up mail options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,                       
    subject,                     
    text: message,               
  };


   
    const info = await transporter.sendMail(mailOptions)
    await Email.create({ to, subject, message });
    return res.status(200).json({ message: 'Email sent successfully', info })
  } 
  catch (error) {
    return res.status(500).json({error: 'Error',details: error.message})
  }
}
