// select the svg
const svg = d3.select("svg");

// set width and height
const width = 800;
const height = 500;

// load csv data
d3.csv("sales.csv").then(function(data) {

    // get John's data
    const john = data[0];

    // make arrays
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const values = [
        +john.Jan,
        +john.Feb,
        +john.Mar,
        +john.Apr,
        +john.May,
        +john.Jun,
        +john.Jul,
        +john.Aug,
        +john.Sep,
        +john.Oct,
        +john.Nov,
        +john.Dec
    ];

    // make x scale
    const xScale = d3.scaleBand()
        .domain(months)
        .range([50, 750])
        .padding(0.1);

    // make y scale
    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([450, 50]);

    // make x axis
    const xAxis = d3.axisBottom(xScale);

    // make y axis
    const yAxis = d3.axisLeft(yScale);

    // add x axis
    svg.append("g")
        .attr("transform", "translate(0,450)")
        .call(xAxis);

    // add y axis
    svg.append("g")
        .attr("transform", "translate(50,0)")
        .call(yAxis);

    // draw bars
    svg.selectAll("rect")
        .data(values)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(months[i]);
        })
        .attr("y", function(d) {
            return yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return 450 - yScale(d);
        })
        .attr("fill", "steelblue");

});