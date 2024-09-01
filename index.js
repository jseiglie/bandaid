'use strict';
const express = require("express");
const { createServer } = require('node:http');
const { join } = require('node:path');
const path = require('path');

const app = express();
const server = createServer(app);


app.use(express.static(path.join(__dirname, './client/build')));


// app.get('/', (req, res) => {
//     res.sendFile(join(__dirname, './client/build/index.html'));
//   });

app.use((req, res) => {
    res.status(200).send('Hello, world!');
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});