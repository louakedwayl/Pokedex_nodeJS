const express = require("express");
const helper = require ("./helper.js")
let pokemons = require ("./mock-pokemon.js");

const app = express();
const port = 3000;

app.listen(port, () => console.log(`Notre application Nodes est demare sur : http://localhost:${port}`))

app.use(express.json());

app.use(express.static('public'));

app.get("/", (req, res) => 
{
    res.send("Hello again depuis express");   
});

app.get("/api/pokemon/:id" , (req, res) => 
{
    const id = parseInt(req.params.id, 10);
    const pokemon = pokemons.find(pokemon => pokemon.id === id);
    if (!pokemon)
        return res.status(404).send("Pokenon non trouve!");
    res.status(200).json( helper ("Pokemon bien trouve", pokemon)); 
});

app.get("/api/pokemons" , (req, res) => 
{
    res.status(200).json(helper ("La liste des Pokemons a bien ete trouve", pokemons));
});

let id = 12;
app.post('/api/pokemons', (req, res) => {
    id++;
  const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
  pokemons.push(pokemonCreated)
  const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`
  res.json(helper(message, pokemonCreated))
})

app.put('/api/pokemon/:id', (req, res) =>
{
    nbr = parseInt(req.params.id, 10);
    const newPokemon = {...req.body};
    pokemons = pokemons.map( pokemon => 
    {
        if (pokemon.id === nbr)
        {
            pokemon = {...pokemon, ...newPokemon};
        }
        return pokemon;
    });
    res.status(200).send("Pokemon modifie");
})

app.delete('/api/pokemon/:id', (req, res) =>
{
    id = parseInt(req.params.id, 10);
    pokemons = pokemons.filter(pokemon =>pokemon.id != id);
    res.status(200).send("Pokemon suprime");
})

app.listen (3000 , () => 
{
})