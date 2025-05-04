// server.js
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const submissionsRoute = require("./routes/submissions");

const app = express();
const PORT = 3000;
const MONGO_URI = "mongodb://localhost:27017";
const DB_NAME = "submissionsDB";

app.use(cors());
app.use(express.json());

let db;

// Connect to MongoDB
MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })
  .then((client) => {
    console.log("✅ Connected to MongoDB");
    db = client.db(DB_NAME);
    // Mount routes
    app.use("/api/submissions", submissionsRoute(db));

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
