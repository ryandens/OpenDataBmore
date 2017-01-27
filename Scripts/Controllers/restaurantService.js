angular.module('restaurants').service('restaurantService', function($http) {
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
