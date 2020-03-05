const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

app.use(express.static('public'));

// app.get('/post/:id', (req, res) => {
//     res.sendFile(path.resolve(`public/post.html`));
// })

app.listen(port, ()=> console.log(`Example app listening on port: ${port}`))