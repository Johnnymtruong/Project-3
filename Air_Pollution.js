// Initialize Leaflet Map
function initMap() {
    const map = L.map('map').setView([20, 0], 2);
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
    const legend = L.control({ position: "bottomright" });

    legend.onAdd = function(map) {
        const div = L.DomUtil.create("div", "legend");
        div.innerHTML += "<h4>Legend</h4>";
        div.innerHTML += '<i style="background: red"></i><span>High Pollution</span><br>';
        div.innerHTML += '<i style="background: yellow"></i><span>Medium Pollution</span><br>';
        div.innerHTML += '<i style="background: green"></i><span>Low Pollution</span><br>';
        
        return div;
    };
    
    legend.addTo(map);
    
    // Fetch the aggregated data JSON for the map
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
        .catch(error => console.error('Error loading data:', error));
}

// Initialize Plotly Graph
function initGraph() {
    // Fetch the aggregated data JSON for the graph
    fetch('aggregated_country_data.json')
        .then(response => response.json())
        .then(data => {
            // Prepare scatter plot data
            const scatterData = {
                x: data.map(country => country.Population),
                y: data.map(country => country.Outdoor_air_pollution),
                mode: 'markers',
                type: 'scatter',
                name: 'Country Data',
                text: data.map(country => country.Country_name),
                marker: { size: 12 }
            };

            // Calculate trend line
            const xValues = data.map(country => country.Population);
            const yValues = data.map(country => country.Outdoor_air_pollution);
            const minX = Math.min(...xValues);
            const maxX = Math.max(...xValues);
            const minY = Math.min(...yValues);
            const maxY = Math.max(...yValues);

            const trendlineData = {
                x: [minX, maxX],
                y: [minY, maxY],
                mode: 'lines',
                type: 'scatter',
                name: 'Trend Line',
                line: {
                    color: 'red',
                    width: 2
                }
            };

            const plotData = [scatterData, trendlineData];

            const layout = {
                title: 'Population vs. Air Pollution',
                xaxis: { title: 'Population' },
                yaxis: { title: 'Outdoor Air Pollution' }
            };

            Plotly.newPlot('graph', plotData, layout);
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
}


// Call the initialization functions
initMap();
initGraph();
