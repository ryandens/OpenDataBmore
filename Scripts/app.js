(function () {
  var app = angular.module('restaurants', []);

  app.controller('HomeController', ['$http', '$scope', function($http, $scope) {
    /*variable representing home controller*/
    var home = this;

    /*array storing restaurant data from JSON file*/
    $scope.restaurants = [];

    /*Model for the search field*/
    home.nameFilter;

    /*variable to track which value to order by*/
    home.orderByVar = {
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

    /*Function that changes orderByVar as needed to update view*/
    home.myOrderBy = function(index) {
        if(index == home.orderByVar.selectedOption.id) {
            home.orderByVar.selectedOption.ascending = !home.orderByVar.selectedOption.ascending;
        } else {
          home.orderByVar.selectedOption = home.orderByVar.availableOptions[index];
        }
    }

    /*constructor for restraunt object */
    function Restaurant(name, zip, rNeighborhood, cDistrict, pDistrict, primaryLoc) {
        this.name = name;
        this.zipCode = zip;
        this.neighborhood = rNeighborhood;
        this.councilDistrict = cDistrict;
        this.policeDistrict = pDistrict;
        this.primaryLocAddress = primaryLoc;
    }


    /*Gets data from JSON file and loads it into $scope.restaurants */ 
    $http.get('/data/Restaurants.json').then(function(success){

      var arr = success.data.data;
      var result = []

      for(i = 0; i < arr.length; i++) {
        var add = JSON.parse(arr[i][13][0])
        result.push(new Restaurant(arr[i][8], arr[i][9], arr[i][10],
          arr[i][11], arr[i][12], add.address + ' ' + add.city + ', ' + add.state));
      }

      $scope.restaurants = result;

      
    });

    
  }]);


})();
