const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const environment = require('./configuration/environment');
const routes = require('./route');


app.use(bodyParser.json()); // handle json data


mongoose.connect(environment.database)
    .then(() => console.log('Mongodb is connected'))
    .catch(err => console.log('Error on connetions', err));

app.use('', routes);

// listen for request
app.listen(environment.port, function () {
    console.log('Node js server starts ' + environment.port);
});