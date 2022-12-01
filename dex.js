const express = require('express');
const app = express();
const https = require('https');
const PORT = process.env.PORT || 3200;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(PORT, () =>{
    console.log(`Server up on ${PORT}`)
});

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/',(req, res) => {
    res.setHeader("Content-Type", "text/html")
    let id = Number(req.body.pokemonID);
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    https.get(url ,(response) => {
        let responseData = "";
        response.on('data',(chunk) =>{
            responseData += chunk;
        });

        response.on('end', () =>{
            let pokemonInfo = JSON.parse(responseData);
            let pokemonName = pokemonInfo.name;
            let pokemonImage = `https://img.pokemondb.net/artwork/large/${pokemonName}.jpg`
            console.log(pokemonImage);

            res.write("<img src=" +pokemonImage + ">")
            res.send();
        })
    })
})










