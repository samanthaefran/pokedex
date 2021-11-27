// require dependencies

const express = require('express');
const app = express();
const pokemon = require('./models/pokemon.js');

const PORT = 3000;

// index
app.get('/pokemon', (req, res) => {
  res.render('index.ejs',  {pokemon});
});

// show
app.get('/pokemon/:id', (req, res) => {
  const foundPoke = pokemon.find(function (pokemon) {
    return pokemon.id === Number(req.params.id)
  })
  res.render('show.ejs', {foundPoke})
})

// listener
app.listen(PORT, () => console.log('its alive!!!'));

