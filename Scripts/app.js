(function () {
  var app = angular.module('restaurants', ['ng-fusioncharts']);

  app.service('restaurantService', function($http) {
    this.filePath = '/data/Restaurants.json';
    this.test;
    this.restaurants;

    /*constructor for restraunt object */
    function Restaurant(name, zip, rNeighborhood, cDistrict, pDistrict, primaryLoc) {
        this.name = name;
        this.zipCode = zip;
        this.neighborhood = rNeighborhood;
        this.councilDistrict = cDistrict;
        this.policeDistrict = pDistrict;
        this.primaryLocAddress = primaryLoc;
    }

    /*Gets data from JSON file and returns it */ 
    this.getData = function() {
        var result = [];
        $http.get(this.filePath).then(function(success){

          var arr = success.data.data;
          
          for(i = 0; i < arr.length; i++) {
            var add = JSON.parse(arr[i][13][0])
            result.push(new Restaurant(arr[i][8], arr[i][9], arr[i][10],
              arr[i][11], arr[i][12], add.address + ' ' + add.city + ', ' + add.state));
          }
          
        });
        this.restaurants = result;
        return result;
    };

    this.getData();
  });






  
  app.controller('HomeController', ['$http', '$scope', function($http, $scope) {
    /*variable representing home controller*/
    var home = this;
    
    /*Model for the search field*/
    home.nameFilter;

    /*Model for which view is shown*/
    home.viewGraphs = true;
    
    /*variable to track the dropDownMenu */
    $scope.dropDownMenu = {
      availableOptions: [
        {id: '0', display: 'Name'},
        {id: '1', display: 'Zip Code'},
        {id: '2', display: 'Neighborhood'},
        {id: '3', display: 'Council District'},
        {id: '4', display: 'Police District'},
        {id: '5', display: 'Primary Address'},
      ],
      selectedOption: {id: '0', display: 'Name'} //This sets the default value of the select in the ui
    };

    /*Function that clears the input fields*/
    home.clearSearch = function () {
        for (var x in home.nameFilter) {
            home.nameFilter[x] = "";
        }
    };

  }]);









  app.controller('TableController', function(restaurantService) {
    /*Variable representing table controller*/
    var table = this;

     /*array storing restaurant data from JSON file*/
    table.restaurants = restaurantService.restaurants;
    
    /*Array of the names of the headers of the table*/
    table.headers = ["Name", "Zip Code", "Neighborhood", "Council District", "Police District", "Primary Location"];


     /*variable to track which value to order by*/
    table.orderByVar = {
      availableOptions: [
        {id: '0', display: 'name', ascending: true},
        {id: '1', display: 'zipCode', ascending: true},
        {id: '2', display: 'neighborhood', ascending: true},
        {id: '3', display: 'councilDistrict', ascending: true},
        {id: '4', display: 'policeDistrict', ascending: true},
        {id: '5', display: 'primaryLocAddress', ascending: true},
      ],
      selectedOption: {id: '0', display: 'name', ascending: true} //This sets the default value of the select in the ui
    };

    /*Function that changes orderByVar as needed to update view*/
    table.myOrderBy = function(index) {
        if(index == table.orderByVar.selectedOption.id) {
            table.orderByVar.selectedOption.ascending = !table.orderByVar.selectedOption.ascending;
        } else {
          table.orderByVar.selectedOption = table.orderByVar.availableOptions[index];
        }
    }

  });






  app.controller('GraphsController', function(restaurantService) {
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
            if (isSearch) {
                if(!(graphs.data[i][graphs.graphOptions.availableOptions[colIndex].colName] == param)) {
                    continue;
                }
            }
            /*Index corresponding to the label of the current element being looked at, -1 if label never seen before*/
            var index = labels.indexOf(graphs.data[i][graphs.graphOptions.selectedOption.colName]);


            if (index == -1) {
                console.log(isSearch && (graphs.data[i][graphs.graphOptions.availableOptions[colIndex].colName] == param))
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



    graphs.search = function(colIndex, param) {

    };

  });


})();

