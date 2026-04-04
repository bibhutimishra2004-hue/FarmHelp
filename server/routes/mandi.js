const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
      {
        params: {
          "api-key": process.env.MANDI_API_KEY,
          format: "json",
          limit: 10,
        },
      }
    );

    // ✅ Send ONLY records array
    res.json(response.data.records);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch mandi prices" });
  }
});

module.exports = router;