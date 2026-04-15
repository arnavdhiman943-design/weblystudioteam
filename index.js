 import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Health check
app.get("/api/hello", (req, res) => {
  res.status(200).json({ message: "Backend working 🚀" });
});

// ✅ Example POST route
app.post("/api/contact", (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Missing fields" });
    }

    return res.status(200).json({
      success: true,
      message: "Form received"
    });

  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// ❗ THIS is the key for Vercel
export default app;
