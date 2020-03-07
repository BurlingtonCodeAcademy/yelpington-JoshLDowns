const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

app.use(express.static('public'));

app.get('/rest-page/:id', (req, res) => {
    res.sendFile(path.resolve(`public/rest-page.html`));
})


app.listen(port, ()=> console.log(`Example app listening on port: ${port}`))