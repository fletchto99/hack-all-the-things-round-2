'use strict';

const port = 1337;
const express = require('express');
const app = express();
const server = app.listen(port);

app.use(express.static(__dirname + '/client'));
