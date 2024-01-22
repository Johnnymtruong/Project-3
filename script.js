// script.js

// Use the absolute path to your project_dataset.json file
const jsonFilePath = "project_dataset.json";
const mapFilePath =
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

function main() {
  let selectorCountry = d3.select("#selCountry");
  let selectorYear = d3.select("#selYear");
  let width = d3.select("#map").node().getBoundingClientRect().width;
  let width2 = d3.select("#bubble").node().getBoundingClientRect().width;
  let height = 300;
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };

  const tooltip = d3
    .select("#tooltip")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("position", "absolute");

  Promise.all([d3.json(jsonFilePath), d3.json(mapFilePath)]).then(function ([
    data,
    mapData,
  ]) {
    console.log("data::", data);
    let random = data;

    const countrylist = [...new Set(random.map((item) => item.Country_name))];

    let selectedCountry =
      d3.select("#selCountry").property("value") || "Afghanistan";

    selectorCountry
      .selectAll("option")
      .data(countrylist)
      .enter()
      .append("option")
      .text((d) => d)
      .property("value", (d) => d);

    const yearlist = [...new Set(random.map((item) => item.Year))];

    let selectedYear = d3.select("#selYear").property("value") || "1990";

    selectorYear
      .selectAll("option")
      .data(yearlist)
      .enter()
      .append("option")
      .text((d) => d)
      .property("value", (d) => d);

    let projection = d3
      .geoNaturalEarth1()
      .scale(100)
      .center([0, 0])
      .rotate([0, -30])
      .translate([width / 2, height / 2]);

    let path = d3.geoPath().projection(projection);

    let svg = d3
      .select("#map")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const barSvg = d3
      .select("#bar-chart")
      .append("svg")
      .attr("width", width2)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const bubbleSvg = d3
      .select("#bubble")
      .append("svg")
      .attr("width", width2)
      .attr("height", height)
      //   .style("background-color", "black")
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3
      .scaleLinear()
      .domain(
        d3.extent(
          random?.filter((d) => d.Year == selectedYear),
          (d) => +d.Unsafe_water_source
        )
      )
      .range([0, width2 - margin.left - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain(
        d3.extent(
          random?.filter((d) => d.Year == selectedYear),
          (d) => +d.Death_rate
        )
      )
      .range([height - margin.top - margin.bottom, 0]);

    const radiusScale = d3
      .scaleSqrt()
      .domain([0, d3.max(data, (d) => +d.No_handwash_access)])
      .range([2, 20]);

    const colorScale = d3
      .scaleSequential(d3.interpolateReds)
      .domain(d3.extent(random, (d) => +d.Death_rate));

    const lineXScale = d3
      .scaleBand()
      .domain(
        data
          ?.filter((d) => d.Country_name === selectedCountry)
          .map((d) => d.Year)
      )
      .range([0, width2 - margin.right - margin.left])
      .padding(0.1);

    const lineYScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(
          data?.filter((d) => d.Country_name === selectedCountry),
          (d) => +d.Death_rate
        ),
      ])
      .range([height - margin.bottom - margin.top, 0])
      .nice();

    const xAxis = d3.axisBottom(xScale);

    const yAxis = d3.axisLeft(yScale);

    svg
      .selectAll("path")
      .data(mapData.features)
      .join("path")
      .attr("class", (d) => "country_" + d.properties.name.replace(" ", "_"))
      .attr("d", path)
      .attr("fill", (d) => {
        const countryData = random.find(
          (data) =>
            data.Country_name === d.properties.name &&
            data.Year === selectedYear
        );
        return countryData ? colorScale(+countryData.Death_rate) : "#d9d9d9";
      })
      .style("stroke", "white")
      .style("stroke-width", 1)
      .attr("cursor", "pointer")
      .on("mouseover", function () {
        d3.select(this).style("fill", "#FFC300");
        tooltip.style("opacity", 1);
      })
      .on("mousemove", function (event, d) {
        const countryData = random.find(
          (data) =>
            data.Country_name === d.properties.name &&
            data.Year === selectedYear
        );
        tooltip
          .html(
            `<b>${d.properties.name}</b><br>Death Rate: ${
              countryData ? countryData.Death_rate + "%" : "N/A"
            }`
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY + 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).style("fill", (d) => {
          const countryData = random.find(
            (data) =>
              data.Country_name === d.properties.name &&
              data.Year === selectedYear
          );
          return countryData ? colorScale(+countryData.Death_rate) : "#d9d9d9";
        });
        tooltip.style("opacity", 0);
      })
      .on("click", function (event, d) {
        d3.select(this).style("fill", "#FFC300");
        tooltip.style("opacity", 1);
        selectorCountry.property("value", d.properties.name);
        selectedCountry = d.properties.name;

        updateBarChart(selectedCountry);
      });

    bubbleSvg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
      .call(xAxis);

    bubbleSvg.append("g").attr("class", "y-axis").call(yAxis);

    bubbleSvg
      .append("text")
      .attr("transform", `translate(${width2 / 2}, ${height - 20})`)
      .style("text-anchor", "middle")
      .text("Unsafe Water Source (%)");

    bubbleSvg
      .append("text")
      .attr("transform", `translate(-25, ${height / 2})rotate(-90)`)
      .style("text-anchor", "middle")
      .text("Death Rate (%)");

    // add title
    bubbleSvg
      .append("text")
      .attr("x", (width2 - margin.left - margin.right) / 2)
      .attr("y", -margin.top / 2 + 5)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Death Rate vs Unsafe Water Source");

    bubbleSvg
      .append("g")
      .selectAll("circle")
      .data(random?.filter((d) => d.Year == selectedYear))
      .join("circle")
      .attr("cx", (d) => xScale(+d.Unsafe_water_source))
      .attr("cy", (d) => yScale(+d.Death_rate))
      .attr("r", (d) => radiusScale(+d.No_handwash_access))
      .style("fill", "steelblue")
      .style("opacity", 0.7)
      .attr("cursor", "pointer")
      .on("mouseover", function (event, d) {
        d3.select(this).style("fill", "#FFC300");
        tooltip.style("opacity", 1);
      })
      .on("mousemove", function (event, d) {
        tooltip
          .html(
            "<b>" +
              d.Country_name +
              "</b><br/>" +
              "Unsafe Water Source: " +
              d.Unsafe_water_source +
              "<br/>" +
              "Death Rate: " +
              d.Death_rate +
              "%<br/>" +
              "No Handwash Access: " +
              d.No_handwash_access
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY + 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).style("fill", "steelblue");
        tooltip.style("opacity", 0);
      });

    barSvg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom - margin.top})`)
      .call(d3.axisBottom(lineXScale));

    barSvg.append("g").attr("class", "y-axis").call(d3.axisLeft(lineYScale));

    barSvg
      .append("text")
      .attr("transform", `translate(${width2 / 2}, ${height - 20})`)
      .style("text-anchor", "middle")
      .text("Year");

    barSvg
      .append("text")
      .attr("transform", `translate(-25, ${height / 2})rotate(-90)`)
      .style("text-anchor", "middle")
      .text("Death Rate (%)");

    // add title
    barSvg
      .append("text")
      .attr("x", (width2 - margin.left - margin.right) / 2)
      .attr("y", -margin.top / 2 + 5)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Death Rate Over Time");

    barSvg
      .append("g")
      .selectAll("rect")
      .data(random?.filter((d) => d.Country_name == selectedCountry))
      .join("rect")
      .attr("x", (d) => lineXScale(d.Year))
      .attr("y", (d) => lineYScale(d.Death_rate))
      .attr("width", lineXScale.bandwidth())
      .attr(
        "height",
        (d) => height - margin.bottom - margin.top - lineYScale(d.Death_rate)
      )
      .attr("fill", "steelblue")
      .attr("cursor", "pointer")
      .on("mouseover", function (event, d) {
        d3.select(this).style("fill", "#FFC300");
        tooltip.style("opacity", 1);
      })
      .on("mousemove", function (event, d) {
        tooltip
          .html(
            "<b>" +
              d.Country_name +
              "</b><br/>" +
              "Year: " +
              d.Year +
              "<br/>" +
              "Death Rate: " +
              d.Death_rate +
              "%"
          )
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY + 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).style("fill", "steelblue");
        tooltip.style("opacity", 0);
      });

    function updateBarChart(selectedCountry) {
      const filteredData = random.filter(
        (d) => d.Country_name === selectedCountry
      );

      // Update xScale and yScale domains
      lineXScale.domain(filteredData.map((d) => d.Year));
      lineYScale.domain([0, d3.max(filteredData, (d) => +d.Death_rate)]);

      // Update the x-axis and y-axis
      barSvg
        .select(".x-axis")
        .transition()
        .duration(1000)
        .call(d3.axisBottom(lineXScale));
      barSvg
        .select(".y-axis")
        .transition()
        .duration(1000)
        .call(d3.axisLeft(lineYScale));

      // Update the bars
      barSvg
        .selectAll("rect")
        .data(filteredData)
        .join("rect")
        .transition()
        .duration(1000)
        .attr("x", (d) => lineXScale(d.Year))
        .attr("y", (d) => lineYScale(d.Death_rate))
        .attr("width", lineXScale.bandwidth())
        .attr(
          "height",
          (d) => height - margin.bottom - margin.top - lineYScale(d.Death_rate)
        );
    }

    selectorCountry.on("change", function () {
      selectedCountry = d3.select(this).property("value");

      updateBarChart(selectedCountry);
    });

    selectorYear.on("change", function () {
      selectedYear = d3.select(this).property("value");
      updateChart(selectedYear);
    });

    function updateChart(selectedYear) {
      const newData = random?.filter((d) => d.Year == selectedYear);

      xScale.domain(d3.extent(newData, (d) => +d.Unsafe_water_source));

      yScale.domain(d3.extent(newData, (d) => +d.Death_rate));

      radiusScale.domain([0, d3.max(newData, (d) => +d.No_handwash_access)]);

      bubbleSvg.select(".x-axis").transition().duration(1000).call(xAxis);

      bubbleSvg.select(".y-axis").transition().duration(1000).call(yAxis);

      bubbleSvg
        .selectAll("circle")
        .data(newData)
        .join("circle")
        .transition()
        .duration(1000)
        .attr("cx", (d) => xScale(+d.Unsafe_water_source))
        .attr("cy", (d) => yScale(+d.Death_rate))
        .attr("r", (d) => radiusScale(+d.No_handwash_access));

      svg
        .selectAll("path")
        .data(mapData.features)
        .join("path")
        .transition()
        .duration(1000)
        .attr("fill", (d) => {
          const countryData = newData.find(
            (data) =>
              data.Country_name === d.properties.name &&
              +data.Year === +selectedYear
          );
          return countryData ? colorScale(+countryData.Death_rate) : "#d9d9d9";
        });
    }
  });
}
//set function to update the drop down menu and its data
function hugeData(sample) {
  d3.json(url).then(function (data) {
    let majordata = data;
    let data1 = majordata.filter((obj) => obj.Country_name == sample);
    let dataResult = data1[0];
    let panel = d3.select("#sample-data");
    panel.html("");
    for (key in dataResult) {
      panel.append("h6").text(`${key.toUpperCase()}: ${dataResult[key]}`);
    }
  });
}
function littleData(sample) {
  d3.json(url).then(function (data) {
    let hugedata = data;
    let data1 = hugedata.filter((obj) => obj.Year == sample);
    let dataResult = data1[0];
    let panel = d3.select("#sample-data2");
    panel.html("");
    for (key in dataResult) {
      panel.append("h6").text(`${key.toUpperCase()}: ${dataResult[key]}`);
    }
  });
}

main();
