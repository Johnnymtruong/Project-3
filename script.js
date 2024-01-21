// script.js

// Use the absolute path to your project_dataset.json file
const jsonFilePath = 'project3_filteredDS';
function main(){
    
    let selectorCountry = d3.select("#selCountry");
    let selectorYear = d3.select("#selYear");
    
    d3.json(jsonFilePath).then(function (data) {
            console.log("data::", data);
            let random = data

            var countrylist = []

            for (let i = 0; i < random.length; i++) {
                
                if (!(countrylist.includes(random[i].Country_name))){
                    countrylist.push(random[i].Country_name);
                }   
            
            };

            for (let j = 0; j < countrylist.length; j++) {
                selectorCountry.append("option").text(countrylist[j]).property("value", random[j].Death_rate);
            }; 


           var Deathratelist = []

            for (let i = 0; i < random.length; i++) {
                
                if (!(Deathratelist.includes(random[i].Death_rate))){
                    Deathratelist.push(random[i].Death_rate);
                }   
            
            };

            for (let k = 0; k <Deathratelist.length; k++) {
                selectorDeathrate.append("option").text(Deathratelist[k]).property("value", random[k].Unsafe_water_source);
            }; 



        
    });
};
    //set function to update the drop down menu and its data
function hugeData(sample) {
    d3.json(url).then(function (data) {
        let majordata = data
        let data1 = majordata.filter(obj => obj.Country_name == sample);
        let dataResult = data1[0];
        let panel = d3.select("#sample-data");
        panel.html("");
        for (key in dataResult) {
            panel.append("h6").text(`${key.toUpperCase()}: ${dataResult[key]}`)
        }
    })
};
function littleData(sample) {
    d3.json(url).then(function (data) {
        let hugedata = data
        let data1 = hugedata.filter(obj => obj.Year == sample);
        let dataResult = data1[0];
        let panel = d3.select("#sample-data2");
        panel.html("");
        for (key in dataResult) {
            panel.append("h6").text(`${key.toUpperCase()}: ${dataResult[key]}`)
        
        }
    })
};    






function CountryChanged(name){
    console.log(name)
}
   
function YearChanged(name){
        console.log(name)
}


main();











