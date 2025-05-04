const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  text: String,
  lat: Number,
  lng: Number,
  timestamp: {
    type: Date,
    default: Date.now
  },
  severity: String
});

module.exports = mongoose.model("Submission", submissionSchema);