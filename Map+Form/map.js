// Wait for the page to load
window.onload = async () => {
  const map = L.map('map').setView([28.6139, 77.2090], 5); // Default view

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors',
  }).addTo(map);

  try {
    // Fetch data from backend
    const response = await fetch('http://localhost:3000/api/submissions');
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Unexpected data format');
    }

    data.forEach((entry) => {
      if (entry.lat && entry.lng) {
        const marker = L.marker([entry.lat, entry.lng]).addTo(map);

        marker.bindPopup(`
          <strong>Message:</strong> ${entry.text}<br>
          <strong>Time:</strong> ${new Date(entry.timestamp).toLocaleString()}
        `);
      }
    });
  } catch (error) {
    console.error('Error loading map data:', error);
  }
};
