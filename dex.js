const express = require('express');
const app = express();
const https = require('https');
const PORT = process.env.PORT || 3200;
const pokemonLimit = 905;
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/',(req, res) => {
    res.setHeader("Content-Type", "text/html");
    let id = Number(req.body.pokemonID);

    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    if(id > pokemonLimit){
        res.write(`There is only ${pokemonLimit} pokemon we have.And... I think that's the limit.Sorry`);
    }
    https.get(url ,(response) => {
        let responseData = "";
        response.on('data',(chunk) =>{
            responseData += chunk;
        });

        response.on('end', () =>{
            let pokemonInfo = JSON.parse(responseData);
            let pokemonName = pokemonInfo.name;
            let pokemonImage = `https://img.pokemondb.net/artwork/large/${pokemonName}.jpg`
            res.write(`<img src=${pokemonImage}>`)
            res.send();
        });
    });
});


app.listen(PORT, () =>{
    console.log(`Server up on ${PORT}`)
});

