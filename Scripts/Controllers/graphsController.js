angular.module('restaurants').controller('GraphsController', function(restaurantService) {
    /*variablle representing GraphsController*/
    var graphs = this;

    /*Column being searched for in*/
    graphs.graphFilterCol;

    /*Content of input parameter for graph search*/
    graphs.graphFilter;

    /*Boolean that tells if we are on the landing page or not*/
    graphs.showLandingPage = true;

    /*array of restaurant data*/
    graphs.data = restaurantService.restaurants;

    /*Object tracking which graph is to be loaded*/
    graphs.graphOptions = {
        availableOptions: [
            {id:'0', display: 'Neighborhood', colName: 'neighborhood'},
            {id:'1', display: 'Zip Code', colName: 'zipCode'},
            {id:'2', display: 'Council District', colName: 'councilDistrict'},
            {id:'3', display: 'Police District', colName: 'policeDistrict'},
            {id:'4', display: 'Landing Page', colName: 'N/A'}
        ],
        selectedOption: {id:'4', display: 'Landing Page', colName: 'N/A'}
    };


    /*Object representing data source for graph*/
    graphs.formattedData = {
        chart: {
            caption: "",
            startingangle: "120",
            showlabels: "0",
            showlegend: "1",
            enablemultislicing: "0",
            slicingdistance: "1",
            showpercentvalues: "1",
            showpercentintooltip: "1",
            theme: "fint"
        },
        data: []
    };

    

    /*'Load the graph with specified index'*/
    graphs.loadGraph = function(graphIndex) {
        /*Clear search input and drop down input*/
        graphs.graphFilter = null;
        graphs.graphFilterCol = null;

        /*Change which option is selected*/
        graphs.graphOptions.selectedOption = graphs.graphOptions.availableOptions[graphIndex];
        if(graphIndex == 4) {
            graphs.showLandingPage = true;
            return;
        } else {
            graphs.showLandingPage = false;
        }

        /*Set caption*/
        graphs.formattedData.chart.caption = "Percent of restaurants in each " + graphs.graphOptions.selectedOption.display;

        graphs.calculateData(null, null);

        
    };

    /*Calculate the value associated with each neighborhood*/
    graphs.calculateData = function(colIndex, param) {
        /*Set graph data to default*/
        graphs.formattedData.data = [];

        /*Label of thing being counted (neighborhood, zip, etc.*/
        var labels = [];

        /*countOfLabels[i] is the number of occurrences of label labels[i]*/
        var countOfLabels = [];

        var isSearch = (colIndex != null && param != null);


        /*for loop that counts each unique label*/
        for(var i = 0; i < graphs.data.length; i++) {

            /*If isSearch and the column being searched does not equal param, skip this element*/
            if (isSearch && !((graphs.data[i][graphs.graphOptions.availableOptions[colIndex].colName]).toString() === param)) {
                continue;
            }
            /*Index corresponding to the label of the current element being looked at, -1 if label never seen before*/
            var index = labels.indexOf(graphs.data[i][graphs.graphOptions.selectedOption.colName]);


            if (index == -1) {
                //if the label not seen before, add the label to the arry and set count = 1
                labels.push(graphs.data[i][graphs.graphOptions.selectedOption.colName]); 
                countOfLabels.push(1);
            } else {
                //otherwise increase the count from the corresponding label
                countOfLabels[index]++;
            }
        }

        /*For loop that puts data in right format and adds it to the graph*/
        for(var j = 0; j < labels.length; j++) {
            graphs.formattedData.data.push({
                label: labels[j],
                value: countOfLabels[j].toString()
            });
        }



    };

  });