//---------- App Server to route to restaurant pages ----------//

//variable declaration & library imports
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
let restArray = ["ahli-babas-kabob", "american-flatbread", "august-first", "beansies-bus", "city-market", "el-cortijo", "farmhouse-grill", "fu-da", "gaku-ramen", "halvorsons", "hen-of-the-wood", "henrys-diner", "honey-road", "istanbul-kebab-house", "kountry-kart-deli", "leunigs-bistro", "mr-mikes", "pascolo-ristorante", "red-panda", "single-pebble", "sweetwaters", "taco-gordo", "the-friendly-toast", "the-skinny-pancake"]
//serving the public folder
app.use(express.static('public'));

//routs to restaurant page with the id of the restaurant
app.get('/rest-page/:id', (req, res) => {
    if (restArray.includes(req.params.id)) {
    console.log('working')
    res.sendFile(path.resolve(`public/rest-page.html`));
    } else {
        res.sendFile(path.resolve(`public/404.html`));
    }
});

//404 handler
app.get('/*', (req, res) => {
    console.log('error')
    res.sendFile(path.resolve(`public/404.html`));
});

app.listen(port, () => console.log(`Example app listening on port: ${port}`))