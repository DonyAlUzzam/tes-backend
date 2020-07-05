const express = require('express');
const bodyParser = require('body-parser');

const feedRoutes = require('./src/routes/feed');

const app = express();

app.use(bodyParser.json()); //Application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

const db = require('./src/models');
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

// app.use('/feed', feedRoutes);
require("./src/routes/book.route")(app);

app.listen(8080)