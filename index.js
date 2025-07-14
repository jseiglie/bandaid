'use strict';
require('dotenv').config();
require('./models') // necesario para cargar los modelos y sincronizar la base de datos
const express = require("express");
const { createServer } = require('node:http');
const { join } = require('node:path');
const path = require('path');
const cors = require('cors');
const sequelize = require('./config/index');
const cloudinary = require('cloudinary').v2;

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
const mailerRoute = require('./routes/email.routes'); 
const cloudinaryRoute = require('./routes/cloudinary.routes');
const stripeRoute = require('./routes/stripe.routes'); 
const webhookRoute = require('./routes/webhook.routes');
const cartsRoute = require('./routes/carts.routes');
const purchaseHistoryRoute = require('./routes/purchaseHistory.routes.js'); // Import the purchase history route


const app = express();
const server = createServer(app);
const router = express.Router();


app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(express.static(path.join(__dirname, './client/dist')));

//before express.json middleware we call webhooks
app.use('/api/webhook', webhookRoute);

//after webhooks we can use express.json middleware
app.use(express.json());



//router config
app.use('/api', router);
app.use('/api/test', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});
app.use('/api/bands', bandRoute);
app.use('/api/set_lists', setListRoute);
app.use('/api/users', userRoute);
app.use('/api/songs', songRoute);
app.use('/api/lives', liveRoute);
app.use('/api/band_members', bandMemberRoute);
app.use('/api/musician_profiles', musicianProfileRoute);
app.use('/api/rehearsal_locals', rehearsalLocalRoute);
app.use('/api/rehearsals', rehearsalRoute);
app.use('/api/mailer', mailerRoute); 
app.use('/api/cloudinary', cloudinaryRoute);
app.use('/api/stripe', stripeRoute);
app.use('/api/carts', cartsRoute ); 
app.use('/api/purchase_history', purchaseHistoryRoute);


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