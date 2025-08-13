// server.js
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
      user: "staff.8conacademy@gmail.com",
      pass: "dpuf bzwg anym exkb",
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
      from: email,
      to: "staff.8conacademy@gmail.com",
      subject: `Inquiry from ${name}`,
      text: `You have received a new inquiry:\n\nName: ${name}\nEmail: ${email}\nPhone: ${contactNumber}\n\nMessage:\n${message}`,
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
      from: email,
      to: "staff.8conacademy@gmail.com",
      subject: `Internship Application - ${fullName} for ${selectedPosition}`,
      text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phoneNumber}\nAddress: ${address}\nDepartment: ${selectedPosition}`,
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
      from: email,
      to: "staff.8conacademy@gmail.com",
      subject: `Workshop Registration - ${fullName}`,
      text: `New Registration:\n\nFull Name: ${fullName}\nEmail: ${email}\nContact: ${contact}\nLocation: ${location}\nProfession: ${businessProfession}`,
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

