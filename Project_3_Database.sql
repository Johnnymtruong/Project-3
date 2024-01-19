
CREATE TABLE "id_table" (
	ID INT PRIMARY KEY,
	"Country_name" VARCHAR(100),
	"Year" INT
);


CREATE TABLE "gdp_clean" (
	ID INT PRIMARY KEY,
    "Country_name" VARCHAR(100),
    "Code" VARCHAR(10),
    "Year" INT,
    "GDP_per_capita" FLOAT(53) 
);

CREATE TABLE "death_rate_clean" (
	ID INT PRIMARY KEY,
    "Country_name" VARCHAR(100),
    "Year" INT,
    "Death_rate" FLOAT(53)

);

CREATE TABLE "death_risks_clean" (
	ID INT PRIMARY KEY,
    "Country_name" VARCHAR(100),
    "Code" VARCHAR(10),
    "Year" INT,
    "Outdoor_air_pollution" INT,
    "High_systolic_blood_pressure" INT,
    "Diet_high_in_sodium" INT,
    "Diet_low_in_whole_grains" INT,
    "Alcohol_use" INT,
    "Diet_low_in_fruits" INT,
    "Unsafe_water_source" INT,
    "Secondhand_smoke" INT,
    "Low_birth_weight" INT,
    "Child_wasting" INT,
    "Unsafe_sex" INT,
    "Diet_low_in_nuts_and_seeds" INT,
    "Household_air_pollution" INT,
    "Diet_low_in_vegetables" INT,
    "Low_physical_activity" INT,
    "Smoking" INT,
    "High_fasting_plasma_glucose" INT,
    "Air_pollution" INT,
    "High_body_mass_index" INT,
    "Unsafe_sanitation" INT,
    "No_handwash_access" INT,
    "Drug_Use" INT,
    "Low_bone_density" INT,
    "Vitamin_A_deficiency" INT,
    "Child_stunting" INT,
    "Discontinued_breastfeeding" INT,
    "Non_exclusive_breastfeeding" INT,
    "Iron_deficiency" INT
);

CREATE TABLE "population_and_demography_clean" (
	ID INT PRIMARY KEY,
    "Country_name" VARCHAR(100),
    "Year" INT,
    "Population" BIGINT,
    "Population_of_children_under_the_age_of_1" FLOAT(53),
    "Population_of_children_under_the_age_of_5" BIGINT,
    "Population_of_children_under_the_age_of_15" BIGINT,
    "Population_under_the_age_of_25" BIGINT,
    "Population_aged_15_to_64_years" BIGINT,
    "Population_older_than_15_years" BIGINT,
    "Population_older_than_18_years" BIGINT,
    "Population_at_age_1" FLOAT(53),
    "Population_aged_1_to_4_years" FLOAT(53),
    "Population_aged_5_to_9_years" BIGINT,
    "Population_aged_10_to_14_years" BIGINT,
    "Population_aged_15_to_19_years" BIGINT,
    "Population_aged_20_to_29_years" BIGINT,
    "Population_aged_30_to_39_years" BIGINT,
    "Population_aged_40_to_49_years" BIGINT,
    "Population_aged_50_to_59_years" BIGINT,
    "Population_aged_60_to_69_years" BIGINT,
    "Population_aged_70_to_79_years" BIGINT,
    "Population_aged_80_to_89_years" BIGINT,
    "Population_aged_90_to_99_years" BIGINT,
    "Population_older_than_100_years" FLOAT(53)
	);


SELECT * FROM death_rate_clean;

SELECT * FROM death_risks_clean;

SELECT * FROM gdp_clean;

SELECT * FROM id_table;

SELECT * FROM population_and_demography_clean;

SELECT gdp."Country_name", gdp."Year", gdp."GDP_per_capita",  dr."Death_rate", drc."Diet_high_in_sodium", drc."Diet_low_in_whole_grains", drc."Alcohol_use", drc."Diet_low_in_fruits", drc."Diet_low_in_nuts_and_seeds",
drc."Diet_low_in_vegetables", drc."Low_physical_activity", drc."Drug_Use", drc."High_body_mass_index"
FROM gdp_clean gdp
INNER JOIN death_rate_clean dr
ON gdp."Country_name" = dr."Country_name" AND gdp."Year" = dr."Year"
INNER JOIN death_risks_clean drc
ON drc."Country_name" = dr."Country_name" AND drc."Year" = dr."Year";

SELECT dr."Country_name", dr."Year", dr."Death_rate", drc."Outdoor_air_pollution", drc."Secondhand_smoke", drc."Household_air_pollution", drc."Smoking", drc."Air_pollution",
pd."Population", pd."Population_of_children_under_the_age_of_1", pd."Population_of_children_under_the_age_of_5", pd."Population_of_children_under_the_age_of_15",
pd."Population_under_the_age_of_25", pd."Population_aged_15_to_64_years", pd."Population_older_than_15_years", pd."Population_older_than_18_years",
pd."Population_at_age_1", pd."Population_aged_1_to_4_years", pd."Population_aged_5_to_9_years", pd."Population_aged_10_to_14_years", pd."Population_aged_15_to_19_years",
pd."Population_aged_20_to_29_years", pd."Population_aged_30_to_39_years", pd."Population_aged_40_to_49_years", pd."Population_aged_50_to_59_years",
pd."Population_aged_60_to_69_years", pd."Population_aged_70_to_79_years", pd."Population_aged_80_to_89_years", pd."Population_aged_90_to_99_years",
pd."Population_older_than_100_years"
FROM death_rate_clean dr
INNER JOIN death_risks_clean drc
ON dr."Country_name" = drc."Country_name" AND dr."Year" = drc."Year"
INNER JOIN population_and_demography_clean pd
ON pd."Country_name" = drc."Country_name" AND pd."Year" = drc."Year";


SELECT dr."Country_name", dr."Year", dr."Death_rate", drc."Unsafe_water_source", drc."Unsafe_sanitation", drc."No_handwash_access"
FROM death_rate_clean dr
INNER JOIN death_risks_clean drc
ON dr."Country_name" = drc."Country_name" AND dr."Year" = drc."Year";


SELECT gdp."Country_name", gdp."Year", gdp."GDP_per_capita",  dr."Death_rate", drc."Diet_high_in_sodium", drc."Diet_low_in_whole_grains", drc."Alcohol_use", drc."Diet_low_in_fruits", drc."Diet_low_in_nuts_and_seeds",
drc."Diet_low_in_vegetables", drc."Low_physical_activity", drc."Drug_Use", drc."High_body_mass_index"
FROM gdp_clean gdp
INNER JOIN death_rate_clean dr
ON gdp."Country_name" = dr."Country_name" AND gdp."Year" = dr."Year"
INNER JOIN death_risks_clean drc
ON drc."Country_name" = dr."Country_name" AND drc."Year" = dr."Year"
WHERE dr."Year" = '2010';