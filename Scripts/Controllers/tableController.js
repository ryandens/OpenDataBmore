angular.module('restaurants').controller('TableController', function(restaurantService) {
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