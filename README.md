# Baltimore Restaurants
Author: Ryan Dens
A basic web app displaying data restaurant data from Open Data Baltimore using AngularJS.
\n
[Data Source](https://data.baltimorecity.gov/Culture-Arts/Restaurants/k5ry-ef3g)

#Setup
Use your favorite Web Server application to host Baltimore Restaurants. I used[Fenix Web Server](http://www.fenixwebserver.com/) to get a server running. Open the application then
click Web Servers > New. Give the project a descriptive name (perhaps, Baltimore Restaurants Web App),
put in the path to the root directory of the project (where index.html is located), ensure
the suggested port is available, then click 'Create'. Start the web server by clicking the
'Play' button on the right hand side of the Baltimore Restaurants Web App in the Fenix
application, or by clicking Web Servers > Start All. Open the web app in your default
browser by simply clicking on "Baltimore Restaurants Web App" or whichever name you gave
your web server.

<img src="/Images/FenixStep1.png" width="250" height="250" />
<img src="/Images/FenixStep2.png" width="250" height="250" />
<img src="/Images/FenixStep3.png" width="250" height="250" />
<img src="/Images/FenixStep4.png" width="250" height="250" />

#How it works
Currently, the application extracts the data from the JSON file from the data source,
then displays that data in a table. This is done using AngularJS. I use $http.get()
to load the data into an array. Then, I select only the columns from the JSON file that
I need, then save the array as an attribute of the Home Controller. Using ng-repeat
I populate the data in table.

#Styling
I'm using Bootstrap 3 to give the site some of it's key stylistic features, such as the
navbar, the jumbotron image, and the inputs in the form.

#Features
Searching is done using the 'filter' filter. Put a keyword, either the name of the
restaurant, zip code, neighborhood, council district, police district, or the primary
location address, into the search bar and all rows with matching values will be displayed.
