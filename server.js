// require dependencies

const express = require('express');
const app = express();
const pokemon = require('./models/pokemon.js');

const PORT = 3000;


app.use(express.static('public'))
app.use(express.urlencoded({extended: false})); 

// index
app.get('/pokemon', (req, res) => {
  res.render('index.ejs',  {pokemon});
});

// new
app.get('/pokemon/new', (req, res) => {
  res.render('new.ejs');
});

// delete

// update

// create
app.post('/pokemon', (req,res) => {
  req.body.id = pokemon.length + 1;
  pokemon.push(req.body)
  res.redirect('/pokemon')
});

// edit 


// show
app.get('/pokemon/:id', (req, res) => {
  const foundPoke = pokemon.find(function (pokemon) {
  return pokemon.id === req.params.id
 })
 res.render('show.ejs', {foundPoke}) 
})


// listener
app.listen(PORT, () => console.log('its alive!!!'));

