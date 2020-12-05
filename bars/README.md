# Bar Chart

This is a simple template for quickly making bar charts with D3. 

![preview](./preview.png "Preview image" )

## To View
1. Navigate to start-charts/

2. Start Python server in terminal: 
    > python -m http.server

3. Open `http://0.0.0.0:8000/bars/index.html` in any browser

## To Edit
1. *config.js*: Set the parameters for your bar chart here: the path to the data, the colors, text and labels, dimensions, etc.

2. *template.js*: Contains the reusable class function for drawing an instance of the bar chart. For each individual chart, create a new copy of ```nameBarChartConfig``` in this file.

3. *render.js*: Ingests data and renders the charts. For each new chart, add:
    >const nameBarChart = new BarChart(nameBarChartConfig)
    >nameBarChart.render()

3. *index.html*: Visually expresses the charts. Use this file to place charts in HTML/CSS using the divID in config.js.

4. *./data/*: Place your data in this folder as a CSV file. 
    - The first column should contain your x-axis groups. Record the name of this column as groupNames in config. 
    - Subsequent columns should contain the numerical data for the height of each bar. 
    - If the dataset contains multiple columns, the bars will automatically group. You can set the color of the bars in ```config```. By default, there are five colors in this palette.


