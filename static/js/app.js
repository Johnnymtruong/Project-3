let baseMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let map = L.map("map", {
    center: [45, -10],
    zoom: 2
});

baseMap.addTo(map);

let url = "country_gdp_death_rate_risks.json";


// Load the data from the URL
d3.json(url).then(data => {
    
    console.log(data)});

    
    
    
    
    // Populate the dropdown menu
    // var dropdownMenu = d3.select("#sampleDropdown");
    // data.names.forEach(name => {
    //     dropdownMenu.append("option").text(name).property("value", name);
    // });

//     // Initial plot
//     var firstSample = data.names[0];
//     updateBarChart(firstSample, data);
//     updateBubbleChart(firstSample, data);
//     updateMetadata(firstSample, data);

//     // Event listener for dropdown change
//     dropdownMenu.on("change", function() {
//         var selectedSample = this.value;
//         updateBarChart(selectedSample, data);
//         updateBubbleChart(selectedSample, data);
//         updateMetadata(selectedSample, data);
//     });
// });

// // Function to update the bar chart
// function updateBarChart(sampleId, data) {
//     var sampleData = data.samples.filter(sample => sample.id === sampleId)[0];
//     var otuIds = sampleData.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`);
//     var sampleValues = sampleData.sample_values.slice(0, 10);
//     var otuLabels = sampleData.otu_labels.slice(0, 10);

//     var trace = {
//         x: sampleValues,
//         y: otuIds,
//         type: "bar",
//         orientation: "h",
//         text: otuLabels
//     };

//     var layout = {
//         title: "Top 10 OTUs Found in Individual",
//         xaxis: { title: "Sample Values" },
//         yaxis: { title: "OTU IDs" }
//     };

//     Plotly.newPlot("barChart", [trace], layout);
// }

// // Function to update the bubble chart
// function updateBubbleChart(sampleId, data) {
//     var sampleData = data.samples.filter(sample => sample.id === sampleId)[0];
//     var otuIds = sampleData.otu_ids;
//     var sampleValues = sampleData.sample_values;
//     var otuLabels = sampleData.otu_labels;

//     var trace = {
//         x: otuIds,
//         y: sampleValues,
//         text: otuLabels,
//         mode: 'markers',
//         marker: {
//             size: sampleValues,
//             color: otuIds
//         }
//     };

//     var layout = {
//         title: 'OTU ID vs Sample Values',
//         xaxis: { title: "OTU ID" },
//         yaxis: { title: "Sample Values" },
//         showlegend: false
//     };

//     Plotly.newPlot("bubbleChart", [trace], layout);
// }

// // Function to update the sample metadata
// function updateMetadata(sampleId, data) {
//     var metadata = data.metadata.filter(sample => sample.id == sampleId)[0];
//     var metadataDisplay = d3.select("#sampleMetadata");
//     metadataDisplay.html("");
//     Object.entries(metadata).forEach(([key, value]) => {
//         metadataDisplay.append("p").text(`${key}: ${value}`);
//     });
// }
