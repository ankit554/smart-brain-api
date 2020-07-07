const express = require('express');
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');
const knex = require('knex');


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const rank = require('./controllers/rank');


//Initialising KNEX.JS Database Connector
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smart_brain'
  }
});


//Initialising Express Server
const app = express();

//MIDDLEWARE
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

//ROOT PATH --> GET
app.get('/',(req,res) => {res.send(database.users)})

//SIGN IN --> POST 
app.post('/signin',(req,res) => {signin.handleSignin(req, res, db, bcrypt)})

//REGISTER --> POST
app.post('/register',(req,res) => {register.handleRegister(req, res, db, bcrypt)})

//PROFILE/:ID
app.get('/profile/:id',(req,res) => {profile.handleProfile(req, res, db)})

//RANK --> PUT
app.put('/rank',(req,res) =>{rank.handleRank(req, res, db)})

//RUNNING SERVER
app.listen(3001,() => { console.log("app is running on port 3001")})
