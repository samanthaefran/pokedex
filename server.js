// require dependencies

const express = require('express');
const app = express();
const pokemon = require('./models/pokemon.js');

const PORT = 3000;
const methodOverride= require('method-override');
app.use(methodOverride('_method'))

app.use('/public', express.static('public'));

app.use(express.urlencoded({ extended: false }));

// index
app.get('/pokemon', (req, res) => {
  res.render('index.ejs', { pokemon });
});

// new
app.get('/pokemon/new', (req, res) => {
  res.render('new.ejs');
});

// delete
app.delete('/pokemon/:id', (req,res) => {
  const foundPoke = pokemon.find(function (pokemon) {
    return pokemon.id === req.params.id
    
  })
  pokemon.splice(foundPoke[req.params.id], 1);
  res.redirect('/pokemon');
})
// update
app.put('/pokemon/:id', (req, res) => {
// console.log('this', req.params.id)
  let foundPoke = pokemon.find(function (pokemon) {
    return pokemon.id === req.params.id
  });
  // console.log(foundPoke)
// const updatedPoke = {
//   id: req.params.id,
//   ...req.body
// }
let updatedPoke = {
  id: req.params.id,
  name: req.body.name,
  img: req.body.img,
  type: req.body.type,
  stats: {
    hp: req.body.hp,
    attack: req.body.attack,
    defense: req.body.defense,
  }
}

const indexOfFoundPoke = pokemon.indexOf(foundPoke)
pokemon[indexOfFoundPoke] = updatedPoke
res.redirect('/pokemon');
})


// create
app.post('/pokemon', (req, res) => {
  req.body.id = pokemon.length +1; 
  const newPoke = {
    id: (pokemon.length + 1).toString(),
    name: req.body.name,
    img: 'https://orig00.deviantart.net/0945/f/2011/237/0/8/who__s_that_pokemon__by_amitlu89-d47rmjf.png',
    type: req.body.type,
    stats: {
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
    }
  }
  pokemon.push(newPoke);
  pokemon.push(req.body);
  res.redirect('/pokemon');
});

// edit 
app.get('/pokemon/:id/edit', (req, res) => {

  const foundPoke = pokemon.find(function(pokemon) {
    return pokemon.id === req.params.id
  });
  res.render('edit.ejs', {foundPoke})
});

// show
app.get('/pokemon/:id', (req, res) => {
  const foundPoke = pokemon.find(function (pokemon) {
    return pokemon.id === req.params.id
  })
  // console.log(foundPoke)
  res.render('show.ejs', { foundPoke })
})


// listener
app.listen(PORT, () => console.log('its alive!!!'));

