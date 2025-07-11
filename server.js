// server.js
import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
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
  const { name, email, contactNumber, message } = req.body;

  // Validation check
  if (!name || !email || !contactNumber || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Set up email transport (use App Password for Gmail)
  const transporter = nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: "staff.8conacademy@gmail.com",
      pass: "cozy kcsi qzkc ewfp", // Gmail App Password
    },
    tls: {
      rejectUnauthorized: false, // 👈 Add this line
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

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Inquiry submitted successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// POST route for registration form - FIXED TO MATCH CONTACT PATTERN
app.post("/registration", async (req, res) => {
  const { fullName, email, contact, location, businessProfession } = req.body;

  // Validation check
  if (!fullName || !email || !contact || !location || !businessProfession) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Set up email transport (use App Password for Gmail) - EXACT SAME AS CONTACT
  const transporter = nodemailer.createTransporter({
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
    subject: `New Registration - ${fullName}`,
    text: `
    You have received a new registration with the following details:

    Full Name          : ${fullName}
    Email              : ${email}
    Contact Number     : ${contact}
    Location           : ${location}
    Business/Profession: ${businessProfession}

    This person has reserved their seat for the Forex Workshop.
    `,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #333; text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
        New Registration Received
      </h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #007bff; margin-top: 0;">Registration Details:</h3>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Full Name:</td>
            <td style="padding: 8px 0; color: #333;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
            <td style="padding: 8px 0; color: #333;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Contact Number:</td>
            <td style="padding: 8px 0; color: #333;">${contact}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Location:</td>
            <td style="padding: 8px 0; color: #333;">${location}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Business/Profession:</td>
            <td style="padding: 8px 0; color: #333;">${businessProfession}</td>
          </tr>
        </table>
      </div>
      
      <div style="background-color: #e7f3ff; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
        <p style="margin: 0; color: #333;"><strong>Note:</strong> This person has reserved their seat for the Forex Workshop.</p>
      </div>
      
      <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">This email was sent from the 8Con Academy registration form.</p>
      </div>
    </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Registration submitted successfully!" });
  } catch (error) {
    console.error("Error sending registration email:", error);
    res.status(500).json({ error: "Failed to send registration email" });
  }
});

// POST route for internship application
app.post("/apply", upload.single("resumeFile"), async (req, res) => {
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

  // Set up email transport (replace with real credentials)
  const transporter = nodemailer.createTransporter({
    service: "gmail",
    auth: {
      user: "staff.8conacademy@gmail.com",
      pass: "cozy kcsi qzkc ewfp", // Gmail App Password
    },
    tls: {
      rejectUnauthorized: false, // 👈 Add this line
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

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});