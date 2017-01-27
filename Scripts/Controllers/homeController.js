angular.module('restaurants').controller('HomeController', ['$http', '$scope', function($http, $scope) {
    /*variable representing home controller*/
    var home = this;
    
    /*Model for the search field*/
    home.nameFilter;

    /*Model for which view is shown*/
    home.viewGraphs = false;
    
    /*variable to track the dropDownMenu */
    $scope.dropDownMenu = {
      availableOptions: [
        {id: '0', display: 'Name', colName: 'name'},
        {id: '1', display: 'Zip Code', colName: 'zipCode'},
        {id: '2', display: 'Neighborhood', colName: 'neighborhood'},
        {id: '3', display: 'Council District', colName: 'councilDistrict'},
        {id: '4', display: 'Police District', colName: 'policeDistrict'},
        {id: '5', display: 'Primary Address', colName: 'primaryLocAddress'},
      ],
      selectedOption: {id: '0', display: 'Name'} //This sets the default value of the select in the ui
    };

    /*Function that clears the input fields*/
    home.clearSearch = function () {
        for (var x in home.nameFilter) {
            home.nameFilter[x] = "";
        }
    };

    home.googleMaps = function() {
        return '<a>Test</a>';
    }

  }]);