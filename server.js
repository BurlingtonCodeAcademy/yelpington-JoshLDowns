const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const port = process.env.PORT || 5000;

app.use(express.static('public'));

app.get('/rest-page/:id', (req, res) => {
    res.sendFile(path.resolve(`public/rest-page.html`));
})

function fillAPI () {
    fetch('public/resources/api/rest-list.json').then((data)=>{
        return data.json();
    }).then((jsonObj)=>{
        jsonObj.forEach((rest)=>{
            fs.writeFile(`public/resources/api/${rest.id}`, jsonObj, ()=>{
                console.log(`Write Successful!`)
            })
        })
    })
}

//fillAPI();

app.listen(port, ()=> console.log(`Example app listening on port: ${port}`))