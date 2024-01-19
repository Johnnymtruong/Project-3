//read in the json file

const url = "country_gdp_death_2000.json";

function main() {

    let dropdownMenu = d3.select("#selDataset")

    // Fetch the JSON data and console log iC
    d3.json(url).then(function (data) {
        console.log(data);
        let random = data
        for (let i = 0; i < random.length; i++) {
            dropdownMenu.append("option").text(random[i].Country_name).property("value", random[i].ID);

        };
        //testing the data reference
        console.log(data[0].Country_name);

        let firstItem = random[0];
        makeCharts(firstItem);
        hugeData(firstItem);
    });
};

function optionChanged(subject) {
    makeCharts(subject);
    hugeData(subject);
    console.log(subject);


};

//set function to update the drop down menu and its data
function hugeData(sample) {
    d3.json(url).then(function (data) {
        let majordata = data
        let data1 = majordata.filter(obj => obj.ID == sample);
        let dataResult = data1[0];
        let panel = d3.select("#sample-data");
        panel.html("");
        for (key in dataResult) {
            panel.append("h6").text(`${key.toUpperCase()}: ${dataResult[key]}`)

        }
    })
};



main();

function makeCharts(sample) {
    d3.json(url).then(function (data) {
        // data = [{},{},{}];
        //.map function

        let countryList = data.map(row => row.Country_name);
        let year = data.map(row => row.Year);
        let gdp = data.map(row => row.GDP_per_capita);
        let deathRate = data.map(row => row.Death_rate);
        let highSodium = data.map(row => row.Diet_high_in_sodium);
        let lowGrains = data.map(row => row.Diet_low_in_whole_grains);
        let alcohol = data.map(row => row.Alcohol_use);
        let lowFruits = data.map(row => row.Diet_low_in_fruits);
        let lowSeeds = data.map(row => row.Diet_low_in_nuts_and_seeds);
        let lowVeggies = data.map(row => row.Diet_low_in_vegetables);
        let lowActivity = data.map(row => row.Low_physical_activity);
        let drugUse = data.map(row => row.Drug_Use);
        let highMass = data.map(row => row.High_body_mass_index);

        let deathRisks = [highSodium, lowGrains, alcohol, lowFruits, lowSeeds, lowVeggies, lowActivity, drugUse, highMass];
            
  

        console.log("this is country:", countryList);
        console.log("this is year:", year);
        console.log("this is GDP:", gdp);
        console.log("this is Death Rate:", deathRate);
        console.log("this is High Sodium Diet:", highSodium);
        console.log("this is Low Grains Diet:", lowGrains);
        console.log("this is Alcohol:", alcohol);
        console.log("this is Low Fruits Diet:", lowFruits);
        console.log("this is Low Seeds Diet:", lowSeeds);
        console.log("this is Low Veggies Diet:", lowVeggies);
        console.log("this is Low Activity:", lowActivity);
        console.log("this is Druge Use:", drugUse);
        console.log("this is High Body Mass:", highMass);


        //make bar chart
        let xbarData = gdp
        let yTicks = countryList

        var barData = [{
            type: 'bar',
            x: xbarData.reverse(),
            y: yTicks,
            orientation: 'h',
            marker: {
                color: 'rgba(55,128,191,0.6)',
                width: 1
            }
        }];
        var layout = {
            title: 'GDP per Country',
            barmode: 'stack'
        };

        Plotly.newPlot('bar', barData, layout);


        //scatter chart code
        var trace1 = {
            x: countryList,
            y: alcohol,
            name: 'Alcohol Use',
            type: 'scatter',
            mode: 'markers'
        };

        var trace2 = {
            x: countryList,
            y: drugUse,
            name: 'Drug Use',
            type: 'scatter',
            mode: 'markers'
        };

        var trace3 = {
            x: countryList,
            y: lowActivity,
            name: 'Low Physical Activity',
            type: 'scatter',
            mode: 'markers'
        };

        var trace4 = {
            x: countryList,
            y: highMass,
            name: 'High Body Mass',
            type: 'scatter',
            mode: 'markers'
        };

        var data = [trace1, trace2, trace3, trace4];

        var layout = {
            scattermode: 'group',
            title: 'Grouped by Country',
            xaxis: { title: 'Country' },
            yaxis: { title: 'GDP vs Death Risk' },
            scattergap: 1
        };

        Plotly.newPlot('scatter', data, layout);

        var trace1 = {
            x:deathRate.slice(0,1000),
            y: deathRisks,
            text: countryList,
            mode: 'markers',
            marker: {
                color: countryList,
                opacity: [1, 0.8, 0.6, 0.4],
                size: deathRate
            }
        };

        var data = [trace1];

        var layout = {
            title: 'Death Risk to Death Rate',
            showlegend: false,
            height: 600,
            width: 600
        };

        Plotly.newPlot('bubble', data, layout);










    })
};