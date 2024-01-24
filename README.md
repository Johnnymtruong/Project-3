# PROJECT INSTRUCTIONS: 
Our website utilizes the following files: 

index.html (homepage), 
hypothesis1, hyposesis2, 
hyposethsis3 for individual dashboards,and the associated json and js files used to populate the website: 
air_pollution.js, 
aggregated_country_data.json, 
app2.js, 
country_gdp_death_2000.json, 
project_dataset.json, 
script.js, 
sytle.css

 Data files and sources are located in the folders with datasets, "Original" denotes the datasets prior to cleanup. 

 SQL_Output folder and file Project_3_Database.sql are the database files used in this project to store the cleaned data. Data_cleanup.ipynb is the jupyter notebook used for data cleaning. 

# Project-3 Overview:
Every country has different risk factors and death rates that affect their economic wellbeing. The purpose of this project is to analyze the different types of recorded death rates, risk factors, and compare them in a broad scope to determine where certain factors range within a comparable number across different economic climates. An extensive and overall broad dataset that shows over 30 factors of death and risk factors, alongside recorded death instances throughout the globe would mean that we can create extensive visualizations and comparisons between regions/countries to determine which factors affect some areas more than others. We have also pulled data for GDP Per Capita and Population demographics to determine how high the death rates are based on death causes and risks. This project will show in user-friendly, interactive visualizations the story of the data we have gathered today. 

# Ethical Considerations:

The goal was to maintain the integrity of the datasets provided, while ensuring we had a full database that would accomodate the possible difference between each set. ID's were allocated based on Country Name and Year to create readable, callable object for our software to utilize. All data was sourced from an organization credited for maintaining data inegrity and knowledgeable data points. The datapoints shown in visualizations are to be intact based on their unique identifiers. No numbers have been altered, and any calculations that have been made are part of an analysis process that is exploratoty in nature, utilized for research purposes, and done so without bias or assumption. 

# Data Analysis 
There are four datasets downloaded from the World Bank or Data for analysis, "Death Risks," "GDP per Capita worldwide," "Death Rates," and "Population Demographics." These three datasets were then put into a jupyter notebook for data cleanup and preparation in visualizations. Extra information had been transferred during the csv downloads, such as extra column information, graph labels misplaced, and unclear column names. Each file was trimmed of excess rows that contained "region" and grouped info that had no true indication which country was which. The ultimate goal was to look at the datapoints at the country level, so the cleaned datasets held only the country information. All three datasets were then downloaded as cleaned csv's and jsonified for transfer to the POstgres SQL database. An id table was also utilized to link each dataset based on Country name and year the data was recorded. In the database, the datasets were combined into three versions: 

1) Countries grouped by GDP per Capita, death rates, and select death risks.
2) Countries grouped by air pollution and associated death rates/risks.
3) Countries grouped by unsafe water and death risks associated with waterborne diseases.

Each of these SQL populated datasets had no blank rows or null values. These were then assigned to each individual for additional analysis and hypothesis testing. 

 # Dataset References:			
 
 Saloni Dattani, Fiona Spooner, Hannah Ritchie and Max Roser (2023) - “Causes of Death” Published online at OurWorldInData.org. Retrieved from: 'https://ourworldindata.org/causes-of-death' [Online Resource]
 
Max Roser, Pablo Arriagada, Joe Hasell, Hannah Ritchie and Esteban Ortiz-Ospina (2023) - “Economic Growth” Published online at OurWorldInData.org. Retrieved from: 'https://ourworldindata.org/economic-growth' [Online Resource]

Hannah Ritchie, Lucas Rodés-Guirao, Edouard Mathieu, Marcel Gerber, Esteban Ortiz-Ospina, Joe Hasell and Max Roser (2023) - "Population Growth". Published online at OurWorldInData.org. Retrieved from: 'https://ourworldindata.org/population-growth' [Online Resource]

Annual death rate from all causes, 1990 to 2019. Institute for Health Metrics and Evaluation, Global Burden of Disease (2019) – processed by Our World in Data. “Deaths - All causes - Sex: Both - Age: Age-standardized (Rate)” [dataset]. Institute for Health Metrics and Evaluation, Global Burden of Disease (2019) [original data]. 


# Code References:

Jessica Baggett Reference(s):

Colorscales in JavaScript. Plotly Graphing Libraries. 2024. https://plotly.com/javascript/colorscales/.

Plotly Colours List. April 2020. https://community.plotly.com/t/plotly-colours-list/11730/6.

Metadata Glossary. The World Data Bank. 2024. https://databank.worldbank.org/metadataglossary/world-development-indicators/series/SP.DYN.CDRT.IN#:~:text=The%20crude%20death%20rate%20is,of%20death%20in%20that%20period.

Standardized Mortality Ratio. Department of Health. 2024. https://www.health.pa.gov/topics/HealthStatistics/Statistical-Resources/UnderstandingHealthStats/Pages/Standardized-Mortality-Ratio.aspx#:~:text=A%20ratio%20greater%20than%201.0,fraction%20shows%20the%20percentage%20comparison.

Ryan Joseph:
Leaflet.js

Purpose: Used for creating interactive maps.

Website: Leaflet - an open-source JavaScript library for interactive maps

Description: Leaflet is a leading open-source JavaScript library for mobile-friendly interactive maps. It is designed with simplicity, performance, and usability in mind.

Plotly.js

Purpose: Used for creating interactive data visualizations.

Website: Plotly JavaScript Open Source Graphing Library

Description: Plotly.js is a high-level, declarative charting library built on top of d3.js and stack.gl. It is used to create interactive and versatile visualizations in the browser.
OpenStreetMap

Purpose: Provided the map tiles for the Leaflet map.

Website: OpenStreetMap

Description: OpenStreetMap is a map of the world, created by people like you and free to use under an open license. It provides freely accessible and editable geographic data.

Johnny Truong:

https://d3js.org/
	
 D3. js works with modern web browsers and standards, such as HTML, CSS, and SVG. It does not require any external plugins or frameworks, and it can handle large and dynamic data sets efficiently. It also supports responsive design, which means your visualizations can adapt to different screen sizes and devices.

  https://geojson.org/

Purpose: Navigate visuals that shows the data about countries with unsafe water source which displays the deathrates of unsafe water source and unsanitation













			
