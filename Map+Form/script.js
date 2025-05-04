const form = document.getElementById("dataForm");
const output = document.getElementById("output");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const userInput = document.getElementById("userInput").value;

  if (!navigator.geolocation) {
    output.textContent = "Geolocation is not supported by your browser.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const accuracy = position.coords.accuracy;
      // Get current submissions from localStorage
      const stored = sessionStorage.getItem("submissions");
      const submissions = stored ? JSON.parse(stored) : [];

      // Add new submission
      submissions.push({
        text: userInput,
        lat: latitude,
        lng: longitude,
        timestamp: new Date().toISOString(),
        acc: accuracy,
      });
      //Save back to localStorage
      sessionStorage.setItem("submissions", JSON.stringify(submissions));
      // Redirect to map
      window.location.href = "map.html";
    },
    (error) => {
      output.textContent = `Error getting location: ${error.message}`;
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
});
