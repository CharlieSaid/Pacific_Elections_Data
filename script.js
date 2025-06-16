// Initialize the map
const map = L.map('map').setView([47.5, -120.5], 7);  // Center on Washington

// Add the base tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Layer storage
let countiesLayer = null;
let schoolDistrictsLayer = null;

// Layer states
let layerStates = {
  counties: true,
  'school-districts': false
};

// Load counties layer
fetch('wa_counties.geojson')
  .then(res => res.json())
  .then(data => {
    countiesLayer = L.geoJSON(data, {
      style: {
        color: "#007bff", // Blue color for counties
        weight: 2,
        fillColor: "#007bff",
        fillOpacity: 0.1
      },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`County: ${feature.properties.NAME || feature.properties.name}`);
      }
    });
    
    // Add counties layer to map initially (since it's active by default)
    countiesLayer.addTo(map);
  })
  .catch(error => {
    console.error('Error loading counties:', error);
  });

// Load school districts layer
fetch('wa_school_districts_fixed.geojson')
  .then(res => res.json())
  .then(data => {
    schoolDistrictsLayer = L.geoJSON(data, {
      style: {
        color: "#6c757d", // Light gray color for school districts
        weight: 1,
        fillColor: "#6c757d",
        fillOpacity: 0.05
      },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`School District: ${feature.properties.NAME || feature.properties.name}`);
      }
    });
    
    // Don't add to map initially (since it's not active by default)
  })
  .catch(error => {
    console.error('Error loading school districts:', error);
  });

// Toggle layer function
function toggleLayer(layerName) {
  const button = document.getElementById(`${layerName}-toggle`);
  const isActive = button.classList.contains('active');
  
  if (isActive) {
    // Turn off layer
    button.classList.remove('active');
    layerStates[layerName] = false;
    
    if (layerName === 'counties' && countiesLayer) {
      map.removeLayer(countiesLayer);
    } else if (layerName === 'school-districts' && schoolDistrictsLayer) {
      map.removeLayer(schoolDistrictsLayer);
    }
  } else {
    // Turn on layer
    button.classList.add('active');
    layerStates[layerName] = true;
    
    if (layerName === 'counties' && countiesLayer) {
      map.addLayer(countiesLayer);
    } else if (layerName === 'school-districts' && schoolDistrictsLayer) {
      map.addLayer(schoolDistrictsLayer);
    }
  }
}