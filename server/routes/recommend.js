const express = require("express");
const router = express.Router();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// router.post("/", async (req, res) => {
//   try {
//     const { region, soil, weather, season } = req.body;

//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.0-flash",
//     });

//     const prompt = `
// You are an agricultural expert.

// Suggest crops for:
// Region: ${region}
// Soil: ${soil}
// Weather: ${weather}
// Season: ${season}

// Give:
// 1. 3-5 crops
// 2. sowing time
// 3. harvesting time
// 4. short reason

// Respond in JSON format.
// `;

//     const result = await model.generateContent(prompt);
//     const response = await result.response.text();

//     res.json({ result: response });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: "AI recommendation failed" });
//   }
// });

// module.exports = router;

router.post("/", async (req, res) => {
    try {
      console.log("BODY:", req.body);   // 👈 add this
  
      const { region, soil, weather, season } = req.body;
  
      if (!region || !soil || !weather || !season) {
        return res.status(400).json({ error: "Missing fields" });
      }
  
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });
  
      
      const prompt = `
You are an agricultural expert.

Return ONLY valid JSON. No explanation. No markdown.

Format:
{
  "crops": [
    {
      "name": "Wheat",
      "sowing": "Oct-Nov",
      "harvest": "Mar-Apr",
      "reason": "..."
    }
  ]
}

Now suggest crops for:
Region: ${region}
Soil: ${soil}
Weather: ${weather}
Season: ${season}

      `;
  
      const result = await model.generateContent(prompt);
     
const responseText = await result.response.text();

console.log("RAW AI RESPONSE:", responseText); // 👈 DEBUG

// 🔥 Clean the response
let cleaned = responseText
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

let parsed;

try {
  parsed = JSON.parse(cleaned);
} catch (e) {
  console.log("JSON PARSE FAILED:", e.message);

  parsed = {
    crops: [
      {
        name: "Wheat",
        sowing: "Oct-Nov",
        harvest: "Mar-Apr",
        reason: "Default fallback (AI formatting issue)"
      }
    ]
  };
}

res.json(parsed);
  
    } catch (err) {
      console.error("ERROR:", err);   // 👈 FULL error
      res.status(500).json({ error: err.message });
    }
  });

  module.exports = router;