require('dotenv').config();
// Libs
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3001;
const { initApollo } = require('./apolloServer');
const { connectMongo } = require('./db/config');

// Express config
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.static(__dirname + './../../'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
const example = require('./api/routes/public');

// Apply routes
app.use('/api/public', example);

// Initialise Apollo
initApollo(server, app);

// Connect to mongo DB
connectMongo(err => {
  if (err) throw err;
  // Start listening on server port once connected to DB
  server.listen(port, err => {
    if (err) throw err;
    console.log(`App is running on ${port}`);
  });
});

// Serve React app
// Wildcard match will handle returning index when page is refreshed
// Routing would otherwise return and error i.e. 'cannot get /someRoute'
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});
