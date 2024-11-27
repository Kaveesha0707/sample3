const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for keywords
let keywords = [
  { id: "1", text: "Example Keyword", alertCount: 0 },
];

// GET /api/keywords
app.get("/api/keywords", (req, res) => {
  res.status(200).json(keywords);
});

// POST /api/keywords
app.post("/api/keywords", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Keyword text is required" });
  }
  const newKeyword = { id: Date.now().toString(), text, alertCount: 0 };
  keywords.push(newKeyword);
  res.status(201).json(newKeyword);
});

// DELETE /api/keywords/:id
app.delete("/api/keywords/:id", (req, res) => {
  const { id } = req.params;
  keywords = keywords.filter((keyword) => keyword.id !== id);
  res.status(200).json({ message: "Keyword deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


