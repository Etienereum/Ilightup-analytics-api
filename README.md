# Project Name: Ilightup Analytics
Ilightup analytics is set to create its own Api to distribute sensitive data to its client.They currently want a GET request only. Due to the nature of sensitivity the data access restrictions have to be put into place. They want you to automate a system that uniquely generates an Api key and assigns it to each first time user.
 
## Requirements
1) A simple interface like sample idea above meant for new users. Each user should have a unique key
2) A user database that stores user info inclusive of their api key
3) Create a simple database and put sample data that will be served out eg(weather)
4) Create a simple database REST api data end point(json format) example http://ziarafrica.herokuapp.com/orders
5) Include the Api key as one of the parameters of each get requests. example http://ziarafrica.herokuapp.com/orders?key=Your_key_here
6) Ensure proper error handling.example http://bustime.mta.info/api/where/stops-for-location.json?lat=40.748433&lon=-73.985656&latSpan=0.005&lonSpan=0.005&ke
