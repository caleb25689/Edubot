import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

async function test() {
  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: "You are EduBot, a smart homework helper. Answer clearly: What is Home Science?" }
            ]
          }
        ]
      }),
    });

    const data = await response.json();
    console.log("📦 Gemini API response:", JSON.stringify(data, null, 2));

    // Extract answer safely
    const answer =
      data?.candidates?.[0]?.content?.parts?.map(p => p.text).join(" ").trim() ||
      "No answer received.";
    console.log("✅ Extracted answer:", answer);

  } catch (err) {
    console.error("❌ Error connecting to Gemini API:", err.message);
  }
}

test();
