'use strict';
require('dotenv').config();
require('./models') // necesario para cargar los modelos y sincronizar la base de datos
const express = require("express");
const { createServer } = require('node:http');
const { join } = require('node:path');
const path = require('path');
const cors = require('cors');
const sequelize = require('./config/index');

//routes import
const bandRoute = require('./routes/band.routes');
const setListRoute = require('./routes/setList.routes');
const userRoute = require('./routes/user.routes');
const songRoute = require('./routes/song.routes');
const liveRoute = require('./routes/live.routes');
const bandMemberRoute = require('./routes/bandMembers.routes');
const musicianProfileRoute = require('./routes/musicianProfile.routes');
const rehearsalLocalRoute = require('./routes/rehearsal_locals.routes');
const rehearsalRoute = require('./routes/rehearsals.routes');

const app = express();
const server = createServer(app);
const router = express.Router();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './client/dist')));


//router config
app.use('/api', router);
app.use('/api/test', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});
app.use('/api/band', bandRoute);
app.use('/api/set_list', setListRoute);
app.use('/api/user', userRoute);
app.use('/api/songs', songRoute);
app.use('/api/lives', liveRoute);
app.use('/api/band_members', bandMemberRoute);
app.use('/api/musician_profiles', musicianProfileRoute);
app.use('/api/rehearsal_locals', rehearsalLocalRoute);
app.use('/api/rehearsals', rehearsalRoute);



app.get('*', (req, res) => {
  res.sendFile(join(__dirname, './client/dist/index.html'));
});


server.listen(3000, async () => {
  try {
    console.log('Connecting to the database...'); 
    
    await sequelize.authenticate();
     
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }  
  console.log('server running at http://localhost:3000');
});