const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const teamRouter = require('./routes/team.js');
const playerRouter = require('./routes/player.js');


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://database:27017/teams', { useNewUrlParser: true });

app.use(teamRouter);
app.use(playerRouter);

app.listen(3000, () => { 
    console.log('Server is running...')
 });
