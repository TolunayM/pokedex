const express = require('express');
const app = express();
const https = require('https');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/',(req, res) => {
    let id = Number(req.body.pokemonID);
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;

})






app.listen(PORT, () =>{
    console.log(`Server up on ${PORT}`)
});



