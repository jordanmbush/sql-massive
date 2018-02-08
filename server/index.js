const express = require('express');
const bodayParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();

const app = express();
app.use(bodayParser.json());

massive(process.env.CONNECTION_STRING).then( dbInstance => {
    app.set('db', dbInstance);
});

app.get('/api/heroes', (req, res) => {
    req.app.get('db').get_heroes().then( heroes => {
        res.status(200).send(heroes);
    }).catch(error => {
        console.log('API Error!', error);
        res.status(500).json({message: 'An error happend'})
    })
})

const PORT = 4000;
app.listen( PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

