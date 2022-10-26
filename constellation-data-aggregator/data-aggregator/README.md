# Notes
> Technologies used
- Express app, SQLite3, Knex

potential problems are:
how do we still take requests and then send data to a db at the same time
create a file instead of sending to the db

maybe in the route, set like a start time in a variable (in outerscope)
then if the current time is >= 10 seconds send data if Object.keys.length > 0: then clear out object 

P: We have an express server that spins up, it listens to a url for input, once it gets said input it then sends it to an object that aggregates the data
and every n seconds, it is then sent to a db

E: 

D: 
Per request > data we are getting in from LG every 10 seconds in a blob

Latency
Request
Response

Per Test Script > things we must calculate every blob

Script runtime

Per Region > things we must send every

Number of requests
Number of Errors
Average Script Runtime
Test runtime

Per Test

Test runtime

A:
- make an object in antoher file that starts empty
- make an empty timestamp variable in another file that will be changed later

- when server starts, if this variable is empty then set it 
- within route update object in other file with helper function
- check the timestamp to date now and if it is >= 10 seconds then send to db
    - if yes then send to db and update time stamp
    - else do nothing

helper functions:
- update object in objectToSend file within the route

MORE NOTES:
to test this idea we can create a program that sends 