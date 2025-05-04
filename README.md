# Real-Time Crisis Sentiment Analysis 🚨🗺️
A real-time distress reporting and visualization system that leverages machine learning to assist authorities in responding swiftly to crises.

## 🧠 Project Overview
**Real-Time Crisis Sentiment Analysis** allows users (especially civilians) to submit messages reporting emergency situations along with their location. The message is analyzed using a machine learning model to predict the urgency of the report. Urgent reports are visualized on a live map, helping authorities quickly identify and prioritize response areas.

## 🔁 Workflow
1. **Frontend**: A web-based form collects the user's message and geolocation using the browser's geolocation API.
2. **Backend (Node.js + Express)**: 
   - Receives the submission.
   - Sends the message text to a Flask-based ML API.
   - Receives prediction (`urgent` / `not urgent`) and confidence score.
   - Stores the data in a MongoDB collection.
3. **ML Model (Flask API)**:
   - A trained sentiment classifier predicts the urgency level of the submitted text.
4. **Visualization (Leaflet Map)**:
   - Submissions are displayed as markers on a map.
   - Urgent messages are highlighted to draw attention.
   - The map auto-refreshes to reflect new updates.

## 🧪 Tech Stack
- **Frontend**: HTML, CSS, JavaScript, Leaflet.js
- **Backend**: Node.js, Express.js, MongoDB
- **ML Model**: Python, Flask, Transformers (e.g., BERT or RoBERTa)
- **Database**: MongoDB

## 🌍 Use Cases
- Real-time flood, fire, or earthquake distress reporting.
- Civilians reporting dangerous infrastructure or situations.
- Central command centers identifying critical hotspots quickly.

## 📈 Future Prospects
- 🌐 **Multilingual Support**: Enable submissions in multiple Indian regional languages using NLP models.
- 📊 **Urgency Clustering**: Automatically escalate priority if multiple distress signals come from the same geographic area.

## 🚀 Getting Started
### Prerequisites
- Node.js & npm
- Python & Flask
- MongoDB (local or cloud)
