(function () {
  var app = angular.module('restaurants', []);

  app.controller('HomeController', ['$http', function($http) {
    var home = this;

    home.restaurants = [];

    $http.get('/data/Restaurants.json').then(function(success){

      var arr = success.data.data;
      var result = []
      // var text = '{ "restaurants" : ['
      //
      //
      // for (var i = 0; i < arr.length; i++) {
      //     text += '{ "name":"'+ arr[i][8];
      //     text += '", "zip":"' + arr[i][9];
      //     text += '", "neighborhood":"' + arr[i][10];
      //     text += '", "councilDistrict":"' + arr[i][11];
      //     text += '", "policeDistrict":"' + arr[i][12];
      //     var loc = JSON.parse(arr[i][13][0]);
      //     text += '" , "primaryLocAddress":"' + loc.address + ' ' + loc.city + ', ' + loc.state + ' ' + arr[i][9];
      //     if (i != (arr.length - 1)) {
      //       text += '" },';
      //     } else {
      //       text += '" } ';
      //     }
      //
      // }
      // text += ']}';
      //
      // var jsonObject = JSON.parse(text);
      // console.log(jsonObject);

      for(i = 0; i < arr.length; i++) {
        temp = [];
        for(j = 8; j < 14; j++) {
          if(j != 13) {
              temp.push(arr[i][j]);
          } else {
            var x = JSON.parse(arr[i][13][0]);
            temp.push(x.address + ' ' + x.city + ', ' + x.state);
          }

        }
        result.push(temp);
      }
      home.restaurants = result;
    });
  }]);

})();
