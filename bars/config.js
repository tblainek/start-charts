const exampleBarChartConfig = {
    divId: "#bar_chart_example",
    chart: {
        dataset: "./data/art_schools.csv",
        groupNames: "CATEGORY"
    },
    title: {
        text: "American Art Schools by Enrollment",
        font: "Roboto Slab",
        size: 16,
        adjust: -40,
        anchor: "middle"
    },
    labelX: {
        title: "Schools",
        titleFont: "Roboto Slab",
        size: 12,
        adjust: 50,
        anchor: "middle",
        tickFont: "Roboto Condensed",
        tickLabelSize: 12,
        tickSize: 7
    },
    labelY: {
        title: "Enrollment",
        titleFont: "Roboto Slab",
        size: 12,
        adjust: 10,
        anchor: "middle",
        tickFont: "Roboto Condensed",
        tickLabelSize: 12,
        tickSize: 5,
        register: "3em",
        domain: [0, 4000]
    },
    legend: {
        textColor: "#000000",
        textFont: "Roboto Condensed",
        positionXDot: 470,
        positionYDot: 96,
        betweenDistanceDot: 25,
        positionXLabel: 485,
        positionYLabel: 100,
        betweenDistanceLabel: 25
    },
    dimensions: {
        height: 400,
        width: 700
    },
    margin: {
        top: 80,
        right: 140,
        bottom: 60,
        left: 110
    },
    style: {
        colors: ["#003f5c","#ff6361","#58508d","#bc5090","#ffa600"],
        betweenGroupPadding: [0.2],
        withinGroupPadding: [0.0]
    }
};
