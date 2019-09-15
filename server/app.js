//Définition des modules
const express = require("express");
// const mongoose = require("mongoose");

const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const product = require("./routes/products.route");




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var allowedOrigins = ['http://localhost:3000'];

app.use(cors({
  origin: function(origin, callback) {
    
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin)
    return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
      'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    
    return callback(null, true);
  }
}));


app.use("/products", product);

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", socket => {
  console.log("New client connected");
  
  socket.on("disconnect", () => console.log("Client disconnected")
  );
})


//Définition et mise en place du port d'écoute
const port = 4242;
app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;