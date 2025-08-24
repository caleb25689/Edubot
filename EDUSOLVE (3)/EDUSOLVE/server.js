import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public folder
app.use(express.static("public"));
app.use(express.json());

// Example API route (EduBot AI)
app.post("/api/ask", async (req, res) => {
  const { question } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // use your chosen model
        messages: [{ role: "user", content: question }],
      }),
    });

    const data = await response.json();
    res.json({ answer: data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "EduBot failed to answer." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 EduBot running on port ${PORT}`);
});
