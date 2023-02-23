var http = require('http');
const { parsed: { PORT } } = require('dotenv').config()

//create a server object:
http.createServer(function (req, res) {
  res.write(res.body); //write a response to the client
  res.end(); //end the response
}).listen(PORT); //the server object listens on port 8080
