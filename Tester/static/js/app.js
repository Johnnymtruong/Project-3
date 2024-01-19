//read in the js file

let url = data;

        let country = data.Country_name;
        let alcohol = data.Alcohol_use;
        let deathRate = data.Death_rate;
        let highSodium = data.Diet_high_in_sodium;
        let lowFruits = data.Diet_low_in_fruits;
        let lowVeggies = data.Diet_low_in_vegetables;
        let lowGrains = data.Diet_low_in_whole_grains;
        let drugUse = data.Drug_Use;
        let gdp = data.GDP_per_capita;
        let highMass = data.High_body_mass_index;
        let lowActivity = data.Low_physical_activity;
        let year = data.Year;

        let xbarData = [alcohol, highSodium, lowFruits, lowVeggies, lowGrains, drugUse, highMass, lowActivity]
        let yTicks = year

        var barData = [{
            type: 'bar',
            x: xbarData,
            y: yTicks,
            text: sample,
            orientation: 'h'
        }];

        Plotly.newPlot('bar', barData);



    //scatter chart code
    var trace1 = {
        x: ['South Korea', 'China', 'Canada'],
        y: [24, 10, 9],
        name: 'Gold',
        type: 'scatter',
        mode: 'markers'
    };

    var trace2 = {
        x: ['South Korea', 'China', 'Canada'],
        y: [13, 15, 12],
        name: 'Silver',
        type: 'scatter',
        mode: 'markers'
    };

    var trace3 = {
        x: ['South Korea', 'China', 'Canada'],
        y: [11, 8, 12],
        name: 'Bronze',
        type: 'scatter',
        mode: 'markers'
    };

    var data = [trace1, trace2, trace3];

    var layout = {
        scattermode: 'group',
        title: 'Grouped by Country',
        xaxis: { title: 'Country' },
        yaxis: { title: 'Medals' },
        scattergap: 0.7
    };

    Plotly.newPlot('myDiv', data, layout);


    
    //bubble chart code
    var trace1 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
            color: otu_ids,
            opacity: [1, 0.8, 0.6, 0.4],
            size: sample_values
        }
    };

    var bubbleData = [trace1];

    var bubbleLayout = {
        title: 'OTU ID',
        showlegend: false,
        height: 600,
        width: 1200
    };

    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    makeplot();



}

