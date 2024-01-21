// Initialize the map
const map = L.map('map').setView([20, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to determine marker color based on pollution level
function getMarkerColor(pollution) {
    if (pollution > 10000) return 'red';
    if (pollution > 5000) return 'yellow';
    return 'green';
}

// Fetch the aggregated data JSON
fetch('aggregated_country_data.json')
    .then(response => response.json())
    .then(countriesData => {
        // Add markers to the map
        countriesData.forEach(country => {
            const marker = L.circleMarker([country.Latitude, country.Longitude], {
                color: getMarkerColor(country.Outdoor_air_pollution),
                radius: Math.log(country.Population / 1000000)
            });

            marker.bindPopup(`<b>${country.Country_name}</b><br>Population: ${country.Population.toFixed(0)}<br>Air Pollution: ${country.Outdoor_air_pollution.toFixed(0)}<br>Death Rate: ${country.Death_rate.toFixed(2)}`);
            marker.addTo(map);
        });
    })
    .catch(error => console.error('Error loading the country data:', error));
