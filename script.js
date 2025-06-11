const map = L.map('map').setView([47.5, -120.5], 7);  // Center on Washington

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

fetch('wa_counties.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: "#3388ff",
        weight: 1,
        fillOpacity: 0.1
      },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`County: ${feature.properties.NAME || feature.properties.name}`);
      }
    }).addTo(map);
  });