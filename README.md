# Baltimore Restaurants
Author: Ryan Dens
<br/>
A basic web app displaying data restaurant data from Open Data Baltimore using AngularJS.
<br/>
[Data Source](https://data.baltimorecity.gov/Culture-Arts/Restaurants/k5ry-ef3g)

# Setup
Use your favorite Web Server application to host Baltimore Restaurants.

One option is using npm. 

1. First intall nodejs on your computer

2. Next, clone this repository with the following command:

	git clone https://github.com/ryandens/OpenDataBmore.git

3. Navigate to the root directory of the OpenDataBmore Project
	
	cd ~/path/to/OpenDataBmore

4. Install http-server 

	npm install http-server -g

5. Run the server
	
	http-server

6. Navigate to one of the available ports. [Click here](http://127.0.0.1:8080) to go the default port. 
Alternativey, simply type the URL into your browswer





I used [Fenix Web Server](http://www.fenixwebserver.com/) to get a server running. Open the 
application then click Web Servers > New. Give the project a descriptive name (perhaps, Baltimore 
Restaurants Web App), put in the path to the root directory of the project (where index.html is located), 
ensurethe suggested port is available, then click 'Create'. Start the web server by clicking 
the'Play' button on the right hand side of the Baltimore Restaurants Web App in the Fenixapplication, 
or by clicking Web Servers > Start All. Open the web app in your default browser by simply clicking 
on "Baltimore Restaurants Web App" or whichever name you gave your web server.

<br/>
Alternatively, use your favorite application for hosting webapps. 
<br/>



# How it works
Currently, the application extracts the data from the JSON file from the data source,
then displays that data in a table. This is done using AngularJS. I use $http.get()
to load the data into an array. Then, I select only the columns from the JSON file that
I need, then save the array as an attribute of the Home Controller. Using ng-repeat
I populate the data in table. Note, the file, as originallly downloaded from Open
Balitmore had an error in it–a negative zip code. So, I removed the negative sign in
my JSON file. Those who get their data from the Open Baltimore should be mindful of this
and posible other errors in the data set.

# Styling
I'm using Bootstrap 3 to give the site some of it's key stylistic features, such as the
navbar, the jumbotron image, and the inputs in the form.

# Features
<h3>Searching/Filtering</h3>
Searching is done using the 'filter' filter. Using a drop down menu, pick the column you would 
like to search for your key word in. Put a keyword, either the name of therestaurant, zip code, 
neighborhood, council district, police district, or the primary location address, into the search 
bar and all rows with matching values will be displayed.
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
not reflect that change, though the ordering of the rows in the table will. Once you have ordered 
by another column, the arrows swich direction as intended I have not figured out a solution yet.
<h3>Visualization</h3>
There are four pie charts which were made using Fusion Charts, referenced below in the external
resources section. You can view the percentage of the total number of restaurants that are in 
each neighborhood, zip code, council district, or police district of Baltimore. This was not
developed in the most ideal way, beacase Fusion Charts does not support filtering of the data, 
so the charts take a little long to load, espcially the neighborhood chart.
<br/>
Additionally, users can filter the data being sent to the chart by filing out the form at 
the button of the view and pressing the 'search' function. In the image below, the 
neighborhood chart is being filtered by the zip code 21218. The chart shows that 36.23%
of restaurants in the 21218 zip code are in Charles Village.
<br/>
Finally, the address of the primary location in the table view is a google maps link to the address

<img src="/Images/graphFilter.PNG" width="900" />




# External Resources
1. [Bootstrap 3](http://getbootstrap.com/) As stated before, I used Bootstrap 3 to make the site more repsonsive. Note that I did not use bootstrap.js, just bootstrap.min.css, located in /Styles/
2. [Angular 1.6.1](https://angularjs.org/) Located in the Scripts folder
3. [Fusion Charts](http://www.fusioncharts.com/) and [Angular-FusionCharts](http://fusioncharts.github.io/angular-fusioncharts/#/demos/ex1) Fusion Charts and the Angular-FusionCharts plugin are used in conjunction to display the graphs, allowing me to have the charts have the same two-way data binding as the rest of the application. The files relevat to this are fusioncharts.js, fusioncharts.charts.js, and angular-fusioncharts.min.js
4. [Font Awesome](http://fontawesome.io/) Used for various icons, font-awesome.min.css is located in the 'Styles' folder. The fonts are in the 'fonts' folder.



# Demo
Here is a demnonstration of the app in a GIF, recorded with [LiceCap](http://www.cockos.com/licecap/)
<img src="/Images/demo.gif" width="600" />

