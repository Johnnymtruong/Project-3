-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "gdp_clean" (
    "Country_name" VARCHAR(100)   NOT NULL,
    "Code" VARCHAR(10),
    "Year" INT NOT NULL,
    "GDP_per_capita" FLOAT(53)   NOT NULL,
    CONSTRAINT "pk_gdp_clean" PRIMARY KEY (
        "Country_name","Year"
     )
);

CREATE TABLE "death_rate_clean" (
    "Country_name" VARCHAR(100)   NOT NULL,
    "Year" INT   NOT NULL,
    "Death_rate" FLOAT(53)   NOT NULL,
    CONSTRAINT "pk_death_rate_clean" PRIMARY KEY (
        "Country_name","Year"
     )
);

CREATE TABLE "death_risks_clean" (
    "Country_name" VARCHAR(100)   NOT NULL,
    "Code" VARCHAR(10),
    "Year" INT  NOT NULL,
    "Outdoor_air_pollution" INT   NOT NULL,
    "High_systolic_blood_pressure" INT   NOT NULL,
    "Diet_high_in_sodium" INT   NOT NULL,
    "Diet_low_in_whole_grains" INT   NOT NULL,
    "Alcohol_use" INT   NOT NULL,
    "Diet_low_in_fruits" INT  NOT NULL,
    "Unsafe_water_source" INT   NOT NULL,
    "Secondhand_smoke" INT   NOT NULL,
    "Low_birth_weight" INT   NOT NULL,
    "Child_wasting" INT   NOT NULL,
    "Unsafe_sex" INT   NOT NULL,
    "Diet_low_in_nuts_and_seeds" INT   NOT NULL,
    "Household_air_pollution" INT   NOT NULL,
    "Diet_low_in_vegetables" INT   NOT NULL,
    "Low_physical_activity" INT   NOT NULL,
    "Smoking" INT   NOT NULL,
    "High_fasting_plasma_glucose" INT   NOT NULL,
    "Air_pollution" INT  NOT NULL,
    "High_body_mass_index" INT   NOT NULL,
    "Unsafe_sanitation" INT   NOT NULL,
    "No_handwash_access" INT   NOT NULL,
    "Drug_Use" INT   NOT NULL,
    "Low_bone_density" INT   NOT NULL,
    "Vitamin_A_deficiency" INT   NOT NULL,
    "Child_stunting" INT   NOT NULL,
    "Discontinued_breastfeeding" INT  NOT NULL,
    "Non_exclusive_breastfeeding" INT   NOT NULL,
    "Iron_deficiency" INT   NOT NULL,
    CONSTRAINT "pk_death_risks_clean" PRIMARY KEY (
        "Country_name","Year"
     )
);

CREATE TABLE "population_and_demography_clean" (
    "Country_name" VARCHAR(100)   NOT NULL,
    "Year" INT  NOT NULL,
    "Population" BIGINT   NOT NULL,
    "Population_of_children_under_the_age_of_1" FLOAT(53)   NOT NULL,
    "Population_of_children_under_the_age_of_5" BIGINT  NOT NULL,
    "Population_of_children_under_the_age_of_15" BIGINT   NOT NULL,
    "Population_under_the_age_of_25" BIGINT  NOT NULL,
    "Population_aged_15_to_64_years" INTEGER   NOT NULL,
    "Population_older_than_15_years" BIGINT   NOT NULL,
    "Population_older_than_18_years" BIGINT   NOT NULL,
    "Population_at_age_1" FLOAT(53)   NOT NULL,
    "Population_aged_1_to_4_years" FLOAT(53)   NOT NULL,
    "Population_aged_5_to_9_years" BIGINT  NOT NULL,
    "Population_aged_10_to_14_years" BIGINT   NOT NULL,
    "Population_aged_15_to_19_years" BIGINT   NOT NULL,
    "Population_aged_20_to_29_years" BIGINT   NOT NULL,
    "Population_aged_30_to_39_years" BIGINT   NOT NULL,
    "Population_aged_40_to_49_years" BIGINT   NOT NULL,
    "Population_aged_50_to_59_years" BIGINT   NOT NULL,
    "Population_aged_60_to_69_years" BIGINT  NOT NULL,
    "Population_aged_70_to_79_years" BIGINT   NOT NULL,
    "Population_aged_80_to_89_years" BIGINT   NOT NULL,
    "Population_aged_90_to_99_years" BIGINT   NOT NULL,
    "Population_older_than_100_years" FLOAT(53)   NOT NULL,
    CONSTRAINT "pk_population_and_demography_clean" PRIMARY KEY (
        "Country_name","Year"
     )
);

ALTER TABLE "death_rate_clean" ADD CONSTRAINT "fk_death_rate_clean_Country_name" FOREIGN KEY("Country_name","Year")
REFERENCES "gdp_clean" ("Country_name", "Year");

ALTER TABLE "death_risks_clean" ADD CONSTRAINT "fk_death_risks_clean_Country_name" FOREIGN KEY("Country_name","Year")
REFERENCES "death_rate_clean" ("Country_name","Year");

ALTER TABLE "population_and_demography_clean" ADD CONSTRAINT "fk_population_and_demography_clean_Country_name" FOREIGN KEY("Country_name","Year")
REFERENCES "death_risks_clean" ("Country_name","Year");

