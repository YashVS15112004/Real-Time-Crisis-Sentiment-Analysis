// routes/submissions.js
const axios = require("axios");
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", async (req, res) => {
    try {
      const { text, lat, lng } = req.body;

      // 🔍 Log the entire request body
      console.log("📨 Request body:", req.body);

      // ❗ Optional: Comment this check temporarily for testing
      if (!text || lat == null || lng == null) {
        console.warn("⚠️ Missing required fields:", req.body);
        return res.status(400).json({ error: "Missing required fields" });
      }

      // 🧠 Send to Flask for prediction
      console.log("🔁 Sending text to Flask API:", text);
      const flaskResponse = await axios.post(
        "http://192.168.238.113:5000/predict",
        { text }
      );

      console.log("📥 Full Flask response object:", flaskResponse.data);

      const { prediction, confidence } = flaskResponse.data;
      console.log("✅ Flask Prediction:", prediction);
      console.log("✅ Flask Confidence:", confidence);

      const submission = {
        text,
        lat,
        lng,
        prediction,
        confidence,
        timestamp: new Date().toISOString(),
      };

      console.log("💾 Inserting into DB:", submission);

      const result = await db.collection("submissions").insertOne(submission);
      console.log("✅ DB Insert result:", result);

      res.status(201).json({
        message: "✅ Submission saved and response sent",
        id: result.insertedId,
      });
    } catch (err) {
      console.error("❌ Error in POST /api/submissions:", err.message);
      console.error("❌ Full error object:", err); // Extra detailed logging
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const submissions = await db.collection("submissions").find({}).toArray();
      res.status(200).json(submissions);
    } catch (err) {
      console.error("❌ Error fetching submissions:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
};
