(function () {
  var app = angular.module('restaurants', []);

  app.controller('HomeController', ['$http', '$scope', function($http, $scope) {
    var home = this;
    $scope.restaurants = [];
    $scope.nameFilter = "";
    console.log($scope.byThisColumn);

    $scope.clearSearch = function () {
        $scope.nameFilter = null;
    };
    // $scope.filterParam = 'test';


    //variable to track the dropDownMenu
    $scope.dropDownMenu = {
      availableOptions: [
        {id: '0', display: 'Name', model: 'nameOption'},
        {id: '1', display: 'Zip Code'},
        {id: '2', display: 'Neighborhood'},
        {id: '3', display: 'Council District'},
        {id: '4', display: 'Police District'},
        {id: '5', display: 'Primary Address'},
      ],
      selectedOption: {id: '0', display: 'Name', model: 'nameOption'} //This sets the default value of the select in the ui
    };


    //constructor for restraunt object
    function Restaurant(name, zip, rNeighborhood, cDistrict, pDistrict, primaryLoc) {
        this.name = name;
        this.zipCode = zip;
        this.neighborhood = rNeighborhood;
        this.councilDistrict = cDistrict;
        this.policeDistrict = pDistrict;
        this.primaryLocAddress = primaryLoc;
    }

    //Get data from JSON file
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
  //Function for the filter of the table
  app.filter('searchFilter', function() {

    // return function() {
    //
    // }

  });


})();
