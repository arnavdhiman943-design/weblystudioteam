const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const { GoogleGenAI } = require('@google/genai');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (your HTML, CSS, JS)
app.use(express.static(__dirname));

// Serve index.html at the root domain
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Setup Email Transporter (Optional - only works if you add env variables)
let transporter;
if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { 
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_APP_PASSWORD 
    }
  });
}

// Setup AI
let ai;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI(process.env.GEMINI_API_KEY);
}

// ═══════════════════════════════════════════════════
//  API ROUTES
// ═══════════════════════════════════════════════════

// Contact Form Route (Sends an email instead of saving to DB)
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  if (transporter) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Webly Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
      return res.status(500).json({ error: "Failed to send email." });
    }
  }
  
  // If no email is configured, just pretend it worked for the UI
  res.json({ success: true, message: "Request received (Demo Mode)" });
});

// AI Chatbot Route
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!ai) return res.json({ reply: "I'm in offline mode right now, but I'd love to help later!" });

    const model = ai.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat();
    const result = await chat.sendMessage(messages[messages.length - 1].content);
    const response = await result.response;
    
    res.json({ reply: response.text() });
  } catch (err) {
    res.status(500).json({ reply: "I'm having a little trouble thinking. Try again?" });
  }
});

// Export for Vercel
module.exports = app;
