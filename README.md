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

<h3>Shown below are images showing how to set up Fenix web server</h3>
<img src="/Images/FenixStep1.png" width="700" />
<img src="/Images/FenixStep2.png" width="280" />
<img src="/Images/FenixStep3.png" width="280" />
<img src="/Images/FenixStep4.png" width="280" />

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
<h3>Searching</h3>
Searching is done using the 'filter' filter. Using a drop down menu, pick the column you would 
like to search for your key word in, or pick all to have the search look in all columns.
Put a keyword, either the name of therestaurant, zip code, neighborhood, council district, 
police district, or the primary location address, into the search bar and all rows with matching 
values will be displayed.
<br/>
<h3>Sorting/Ordering the data (Grid Control)</h3>
Using the buttons above each of the headers, sort the data, either ascending or descending,
according to a specific column. The current column being ordered by will have the green button.
The direction of the arrow on the button indicates whether it is being sorted in ascending or
descending order. An up arow means ascending order and a down arrow means descending order.
All are defaulted to be in ascending order. To change the whether the current column 
being ordered by is ascending or descending, simply click on it again.
<br/>
This currently has a bug in it, though it is minor and still usable. When the page first loads,
if you try to change whether the first column (default) is ascending/descending, the arrow will
not reflect that change, though the ordering of the rows in the table will. I have not figured
out a solution yet.


