// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

/* ---------- Setup ---------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

/* ---------- CORS ---------- */
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:4173",
    "https://8conacademy.com",
    "https://www.8conacademy.com",
    "http://8conacademy.com",
    "http://www.8conacademy.com",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

/* ---------- Middleware ---------- */
app.use(express.json({ limit: "2mb" }));

// Multer in-memory for email attachment
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter(req, file, cb) {
    if (file.mimetype === "application/pdf") return cb(null, true);
    return cb(new Error("Only PDF files are allowed"));
  },
});

/* ---------- Email Transport (Gmail App Password) ---------- */
function makeTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
<<<<<<< HEAD
      user: "assyrah.alcantara@gmail.com",
      pass: "eoxd vhye mucn uxzg",
=======
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
>>>>>>> origin/main
    },
    tls: { rejectUnauthorized: false },
  });
}

/* ---------- API: Contact ---------- */
app.post("/contact", async (req, res) => {
  try {
    const { name, email, contactNumber, message } = req.body;
    if (!name || !email || !contactNumber || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const transporter = makeTransport();
    await transporter.sendMail({
      from: `"${name} via 8Con Academy" <${process.env.GMAIL_USER}>`,
      replyTo: email,
      to: process.env.RECIPIENT_EMAIL || process.env.GMAIL_USER,
      subject: `Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #fff; margin: 0;">New Inquiry</h2>
          </div>
          <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <h3 style="color: #ff1f2c; margin-top: 0;">From: ${name}</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 100px;">Name:</td><td style="padding: 8px 0;">${name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${contactNumber}</td></tr>
            </table>
            <hr style="margin: 16px 0; border: none; border-top: 1px solid #e0e0e0;" />
            <p style="font-weight: bold; margin-bottom: 4px;">Message:</p>
            <p style="background: #f5f5f5; padding: 12px; border-radius: 6px; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    return res.json({ message: "Inquiry submitted successfully!" });
  } catch (err) {
    console.error("Error sending contact email:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

/* ---------- API: Internship Application (with PDF) ---------- */
app.post("/apply", upload.single("resumeFile"), async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      address,
      phoneNumber,
      selectedPosition,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Resume file is required." });
    }

    const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");
    const transporter = makeTransport();

    await transporter.sendMail({
      from: `"${fullName} via 8Con Academy" <${process.env.GMAIL_USER}>`,
      replyTo: email,
      to: process.env.RECIPIENT_EMAIL || process.env.GMAIL_USER,
      subject: `Internship Application - ${fullName} for ${selectedPosition}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #fff; margin: 0;">Internship Application</h2>
          </div>
          <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <h3 style="color: #ff1f2c; margin-top: 0;">From: ${fullName}</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td><td style="padding: 8px 0;">${fullName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${phoneNumber}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Address:</td><td style="padding: 8px 0;">${address}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Department:</td><td style="padding: 8px 0;">${selectedPosition}</td></tr>
            </table>
            <p style="color: #666; margin-top: 16px; font-size: 13px;">📎 Resume attached as PDF</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: req.file.originalname,
          content: req.file.buffer,
          contentType: "application/pdf",
        },
      ],
    });

    return res.json({ message: "Application submitted successfully!" });
  } catch (err) {
    console.error("Error sending application email:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

/* ---------- API: Workshop Registration ---------- */
app.post("/registration", async (req, res) => {
  try {
    const { fullName, email, contact, location, businessProfession } = req.body;
    if (!fullName || !email || !contact || !location || !businessProfession) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const transporter = makeTransport();
    await transporter.sendMail({
      from: `"${fullName} via 8Con Academy" <${process.env.GMAIL_USER}>`,
      replyTo: email,
      to: process.env.RECIPIENT_EMAIL || process.env.GMAIL_USER,
      subject: `Workshop Registration - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #fff; margin: 0;">Workshop Registration</h2>
          </div>
          <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <h3 style="color: #ff1f2c; margin-top: 0;">From: ${fullName}</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Full Name:</td><td style="padding: 8px 0;">${fullName}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Contact:</td><td style="padding: 8px 0;">${contact}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Location:</td><td style="padding: 8px 0;">${location}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Profession:</td><td style="padding: 8px 0;">${businessProfession}</td></tr>
            </table>
          </div>
        </div>
      `,
    });

    return res.json({ message: "Registration successful and email sent!" });
  } catch (err) {
    console.error("Error sending registration email:", err);
    return res.status(500).json({ error: "Failed to send email." });
  }
});

/* ---------- Static: Serve Vite build ---------- */
/* Ensure `npm run build` produced dist/ next to this server.js */
const staticDir = path.join(__dirname, "dist");
app.use(express.static(staticDir, { maxAge: "1h", index: "index.html" }));

/* ---------- SPA Fallback for all GET routes ---------- */
/* This makes /aboutus, /registration, etc. load the React app */
app.get("*", (req, res) => {
  res.sendFile(path.join(staticDir, "index.html"));
});

/* ---------- Error Handler ---------- */
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  return res.status(500).json({ error: "Internal server error" });
});

/* ---------- Start ---------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

