// server.js
import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 3001;

// CORS configuration - Fix CORS issues
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:4173"], // Add your frontend URLs
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Configure multer for file upload
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter(req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

// POST route for contact us
app.post("/contact", async (req, res) => {
  try {
    const { name, email, contactNumber, message } = req.body;

    // Validation check
    if (!name || !email || !contactNumber || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Set up email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "staff.8conacademy@gmail.com",
        pass: "cozy kcsi qzkc ewfp", // Gmail App Password
      },
      tls: {
        rejectUnauthorized: false, 
      },
    });

    const mailOptions = {
      from: email,
      to: "staff.8conacademy@gmail.com",
      subject: `Inquiry from ${name}`,
      text: `
You have received a new inquiry with the following details:

Name     : ${name}
Email    : ${email}
Phone    : ${contactNumber}

Message:
${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Inquiry submitted successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// POST route for internship application
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

    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ error: "Resume file is required." });
    }

    // Set up email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "staff.8conacademy@gmail.com",
        pass: "cozy kcsi qzkc ewfp", // Gmail App Password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const fullName = `${firstName} ${middleName} ${lastName}`.trim();

    const mailOptions = {
      from: email,
      to: "staff.8conacademy@gmail.com",
      subject: `Internship Application - ${fullName} for ${selectedPosition}`,
      text: `
Name: ${fullName}
Email: ${email}
Phone: ${phoneNumber}
Address: ${address}
Department: ${selectedPosition}
      `,
      attachments: [
        {
          filename: resumeFile.originalname,
          content: resumeFile.buffer,
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// POST route for registration - FIXED THE SYNTAX ERROR
app.post("/registration", async (req, res) => {
  try {
    console.log("Registration request received:", req.body);
    
    const { fullName, email, contact, location, businessProfession } = req.body;

    // Validation check - FIXED: Removed the stray 'z' character
    if (!fullName || !email || !contact || !location || !businessProfession) {
      console.log("Validation failed - missing fields");
      return res.status(400).json({ error: "All fields are required." });
    }

    console.log("Creating email transporter...");
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "staff.8conacademy@gmail.com",
        pass: "cozy kcsi qzkc ewfp", // App Password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    console.log("Preparing email...");

    const mailOptions = {
      from: email,
      to: "staff.8conacademy@gmail.com",
      subject: `Workshop Registration - ${fullName}`,
      text: `
New Registration Received:

Full Name   : ${fullName}
Email       : ${email}
Contact     : ${contact}
Location    : ${location}
Profession  : ${businessProfession}
      `,
    };

    console.log("Sending email...");
    await transporter.sendMail(mailOptions);
    res.json({ message: "Inquiry submitted successfully!" });
    console.log("Email sent successfully!");
    
    res.json({ message: "Registration successful and email sent!" });
  } catch (error) {
    console.error("Error sending registration email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

// Add error handling middleware
app.use((error, req, res, next) => {
  console.error("Server error:", error);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});