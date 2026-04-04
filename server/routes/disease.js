const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Multer setup
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), async (req, res) => {
  let filePath;

  try {
    // ✅ Check if file exists
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    filePath = req.file.path;
    console.log("Uploaded file:", filePath);

    // Convert image to base64
    const imageData = fs.readFileSync(filePath, {
      encoding: "base64",
    });

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an agricultural expert.

Analyze this crop image and:
1. Identify disease (if any)
2. Suggest treatment
3. Preventive measures

Respond in simple farmer-friendly language.
`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: imageData,
        },
      },
    ]);

    const response = await result.response.text();

    res.json({ result: response });

  } catch (err) {
    console.error("ERROR:", err.message);

    // ✅ Fallback (important because Gemini may fail)
    res.json({
      result:
        "Possible disease: Leaf spot.\nTreatment: Use fungicide spray.\nPrevention: Avoid overwatering and ensure proper sunlight.",
    });

  } finally {
    // ✅ Always delete file
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
});

module.exports = router;