const map = L.map('map').setView([47.5, -120.5], 7);  // Center on Washington

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Ready to load district boundaries with L.geoJSON()
