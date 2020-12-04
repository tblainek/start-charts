class BarChart {
    constructor(config) {
        this.config = config;
        
        return this;
    }

    getDimensions() {
        const {
            dimensions,
            margin
        } = this.config

        return {
            width: dimensions.width - margin.left - margin.right,
            height: dimensions.height - margin.top - margin.bottom
        } 
    }    

    createSvg() {
        const {
            divId,
            margin,
        } = this.config

        const { width, height } = this.getDimensions();

        // svg from dimensions and margin input
        return d3.select(divId)
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
        }

    render() {
        const {
            chart,
            title,
            labelX,
            labelY,
            legend,
            margin,
            style
        } = this.config


        d3.csv(chart.dataset, (data) => {
                const svg = this.createSvg()

                // assign data
                const withinGroups = data.columns.slice(1),
                    allGroups = d3.map(data, function(d){
                        return(d[chart.groupNames])
                    }).keys();
                    
                const { width, height } = this.getDimensions();
                
                // chart title
                svg.append("text")
                    .attr("x", width / 2)
                    .attr("y", title.adjust)
                    .text(title.text)
                    .attr("text-anchor", title.anchor)
                    .attr("font-size", title.size)
                    .attr("font-family", title.font);
            
                // x-axis
                const x = d3.scaleBand()
                    .domain(allGroups)
                    .range([0, width])
                    .padding(style.betweenGroupPadding)
            
                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x).tickSize(labelX.tickSize))
                    .attr("font-size", labelX.tickLabelSize)
                    .attr("font-family", labelX.tickFont);
            
                // x-axis label
                svg.append("text")             
                    .attr("transform", "translate(" + (width/2) + " ," + (height + labelX.adjust) + ")")
                    .style("text-anchor", labelX.anchor)
                    .text(labelX.title)
                    .attr("font-size", labelX.size)
                    .attr("font-family", labelX.titleFont);
            
                // y-axis
                const y = d3.scaleLinear()
                        .domain(labelY.domain)
                        .range([height, 0]);
            
                svg.append("g")
                    .call(d3.axisLeft(y).tickSize(labelY.tickSize))
                    .attr("font-size", labelY.tickLabelSize)
                    .attr("font-family", labelY.tickFont);
            
                 // y-axis label
                svg.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 0 - margin.left + labelY.adjust)
                    .attr("x", 0 - (height / 2))
                    .attr("dy", labelY.register)
                    .style("text-anchor", labelY.anchor)
                    .text(labelY.title)
                    .attr("font-size", labelY.size)
                    .attr("font-family", labelY.titleFont);
            
                const widthWithinGroups = d3.scaleBand()
                    .domain(withinGroups)
                    .range([0, x.bandwidth()])
                    .padding(style.withinGroupPadding)
            
                // color palette
                const color = d3.scaleOrdinal()
                    .domain(withinGroups)
                    .range(style.colors)
            
                // bar shapes
                svg.append("g")
                    .selectAll("g")
                    .data(data)
                    .enter()
                    .append("g")
                        .attr("transform", function(d) { 
                            return "translate(" + x(d[chart.groupNames]) + ",0)"; 
                        })
                    .selectAll("rect")
                    .data(function(d) { 
                        return withinGroups.map(function(key) { 
                            return {key: key, 
                                    value: d[key]
                                }; 
                            }); 
                        })
                    .enter().append("rect")
                        .attr("x", function(d) { return widthWithinGroups(d.key); })
                        .attr("y", function(d) { return y(d.value); })
                        .attr("width", widthWithinGroups.bandwidth())
                        .attr("height", function(d) { return height - y(d.value); })
                        .attr("fill", function(d) { return color(d.key); });

                // legend
                const legendKeys = ["Undergraduates","Postgraduates"]

                // Usually you have a color scale in your chart already
                const legendColor = d3.scaleOrdinal()
                    .domain(legendKeys)
                    .range(style.colors);

                // Add one dot in the legend for each name.
                svg.selectAll("dots")
                .data(legendKeys)
                .enter()
                .append("circle")
                    .attr("cx", legend.positionXDot)
                    .attr("cy", function(d,i){ 
                        return legend.positionYDot + i*legend.betweenDistanceDot
                    })
                    .attr("r", 5)
                    .style("fill", function(d) { 
                        return legendColor(d) 
                    })

                // Add one dot in the legend for each name.
                svg.selectAll("labels")
                .data(legendKeys)
                .enter()
                .append("text")
                    .attr("x", legend.positionXLabel)
                    .attr("y", function(d,i) { 
                        return legend.positionYLabel + i*legend.betweenDistanceLabel
                    })
                    .style("fill", legend.textColor)
                    .text(function(d) { return d })
                    .attr("text-anchor", "left")
                    .attr("font-family", legend.textFont)
                    .style("alignment-baseline", "middle")
    
        })
    }
}