const path = require('path');
const axios = require('axios')

const express = require('express');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/search/:search', (req, res) => {
    const { search } = req.params
    console.log('search: ', search)
    // COULDN'T FIGURE OUT WHY PARAMS WEREN'T WORKING
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
        .then(({data}) => {
            console.log('Should have cocktails here! ', data['drinks'][0])
            res.send(data['drinks'])
        })
        .catch(error => {
            console.log('error: ', error)
            res.sendStatus(401)
        })
})

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`App running on localhost: ${PORT}`)
})