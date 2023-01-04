const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const errorHandler = require('./server/middlewares/errorHandler')
// const jwtVerify = require('./server/middlewares/jwt')
const path = require('path')
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/build'));

app.use(cors())
// process.env.MONGODB_URI || 
var uristring = process.env.MONGODB_URI

mongoose.connect(uristring, { useUnifiedTopology: true });
var db = mongoose.connection;

db.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
  process.exit(1);
});
db.once('open', function() {
  console.log('database connected')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Authenticate Route
// app.use(jwtVerify)

// api routes
require('./server/routes/routes')(app);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'));
  });

//global error handlers
app.use(errorHandler)


app.listen(port, () => {
    console.log("App is running on port " + port);
});  
  
