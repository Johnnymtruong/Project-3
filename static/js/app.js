//read in the json file


const url = "country_gdp_death_2000.json";

function main() {
    let dropdownMenu = d3.select("#selDataset")

    // Fetch the JSON data and console log iC
    d3.json(url).then(function(data) {
        console.log(data);
        let random = data
        for (let i = 0; i < random.length; i++) {
            dropdownMenu.append("option").text(random[i].ID).property("value", random[i].ID);

        };
        //testing the data reference
        console.log(random[0].Country_name);

        let firstItem = random[0].ID;
        makeCharts(firstItem);
        hugeData(firstItem);

    });
    };
    function optionChanged(subject) {
    
        makeCharts(subject);
        hugeData(subject);
        console.log(subject);}

main();

//set function to update the drop down menu and its data
function hugeData(sample) {
    d3.json(url).then(function(data) {
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


function makeCharts(sample) {
    d3.json(url).then(function(data) {
        
        let majordata = data
        let dataArray= majordata.filter(obj => obj.ID == sample);
        let dataResult = dataArray[0];
       
        console.log(dataResult);
        console.log(dataArray);

        
        let country = dataResult.Country_name;
        let countryList = data.map(row => row.Country_name);
        // data = [{},{},{}];
        //.map function
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



        console.log("this is country:", country);
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
        let xbarData = gdp;
        let yTicks = countryList;

        var barData = [{
            type: 'bar',
            x: xbarData,
            y: yTicks,
            orientation: 'h',
            marker: {
                color: 'rgba(55,128,191,0.6)',
                width: 10
            }
        }];
        var layout = {
            title: 'GDP per Country',
            barmode: 'stack',
            plot_bgcolor:"mistyrose",
            paper_bgcolor:"#FFF3"
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
            yaxis: { title: 'Country Death Rates by Cause' },
            scattergap: 1,
            plot_bgcolor:"mistyrose",
            paper_bgcolor:"#FFF3",
            color:'white'

        };

        Plotly.newPlot('scatter', data, layout);

        //bubble chart
        var trace1 = {
            x: gdp,
            y: deathRisks,
            name: 'Death Risks by GDP',
            text: countryList,
            mode: 'markers',
            marker: {
                color: ['rgb(166,206,227)', 'rgb(31,120,180)','rgb(178,223,138)','rgb(51,160,44)','rgb(251,154,153)', 'rgb(227,26,28)',
                'rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)','gold', 'goldenrod', 'gray', 'grey', 'green',
                'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo','ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen',
                'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan','lightgoldenrodyellow','lightgray', 'lightgrey',
                'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen','lightskyblue', 'lightslategray', 'lightslategrey',
                'lightsteelblue', 'lightyellow', 'lime', 'limegreen','linen', 'magenta', 'maroon', 'mediumaquamarine',
                'mediumblue', 'mediumorchid', 'mediumpurple','mediumseagreen', 'mediumslateblue', 'mediumspringgreen',
                'mediumturquoise', 'mediumvioletred', 'midnightblue','mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy',
                'oldlace', 'olive', 'olivedrab', 'orange', 'orangered','orchid', 'palegoldenrod', 'palegreen', 'paleturquoise',
                'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink','plum', 'powderblue', 'purple', 'red', 'rosybrown',
                'royalblue', 'saddlebrown', 'salmon', 'sandybrown','seagreen', 'seashell', 'sienna', 'silver', 'skyblue',
                'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise',
                'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure',
                'beige', 'bisque', 'black', 'blanchedalmond', 'blue','blueviolet', 'brown', 'burlywood', 'cadetblue',
                'chartreuse', 'chocolate', 'coral', 'cornflowerblue','cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan',
                'darkgoldenrod', 'darkgray', 'darkgrey', 'darkgreen','darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange',
                'darkorchid', 'darkred', 'darksalmon', 'darkseagreen','darkslateblue', 'darkslategray', 'darkslategrey','darkturquoise',
                'darkviolet', 'deeppink', 'deepskyblue','dimgray', 'dimgrey', 'dodgerblue', 'firebrick',
                'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro','ghostwhite'],
                opacity: [1, 0.8, 0.6, 0.4],
                size: deathRate
            }
        };

        var data = [trace1];

        var layout = {
            title: 'Death Rate per GDP',
            showlegend: true,
            height: 700,
            width: 1200,
            plot_bgcolor:"mistyrose",
            paper_bgcolor:"#FFF3"
            
        };

        Plotly.newPlot('bubble', data, layout);



    })
};