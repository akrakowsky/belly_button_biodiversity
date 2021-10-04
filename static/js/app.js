function buildCharts(sample){
    d3.json("samples.json").then(function(data) {
        var samples = data.samples;
        console.log(samples);
        var resultArray = samples.filter(function(data){
            return data.id === sample;
        });
        var result = resultArray[0];
        // Get keys
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        console.log(otu_ids);
        console.log(otu_labels);
        console.log(sample_values)

        // Build bubble chart
        var bubbleChart = {
            title: "Bacteria Cultures per Sample",
            margin: {t: 30},
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        }
        var bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }];
        Plotly.newPlot("bubble", bubbleData, bubbleChart);
    });
}

function buildMetadata(sample) {
    
};

function init (){
    console.log("Testing");
    // Get selector id
    var selector = d3.select("#selDataset");
    console.log(selector);
    //Grab sample data
    d3.json("samples.json").then(function(data) {
        console.log(data);
        var idName = data.names;
        idName.forEach(function(name){
            selector.append("option").text(name).property("value", name)
        });
        var sampleOne = idName[0];
        console.log(sampleOne);
        buildCharts(sampleOne);
        buildMetadata(sampleOne);
    });
}

// Initialize dashboard
init()