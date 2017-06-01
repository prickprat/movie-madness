const express = require('express');

const ENV_DEFS = require('./environment');
const PORT = ENV_DEFS.PORT;
const API_KEY = ENV_DEFS.API_KEY;
const API_BASE_URL = ENV_DEFS.API_BASE_URL;

let app = express();

// search actor : https://api.themoviedb.org/3/search/person?query={name}&api_key={api_key}
// get acted-in :: https://api.themoviedb.org/3/person/{actor_id}/movie_credits?api_key={api_key}
// get cast-of -- https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key={api_key}

app.get('/actor/search/:name', (req, res) => {
    console.log('API :: /actor/search ::');
    console.log(`${API_BASE_URL}/search/person?query=${req.params.name}&api_key=${API_KEY}`);

    res.status(400).json({ error: 'not implemented' });
});

app.get('/actor/:id/movies', (req, res) => {
    console.log(`API :: /actor/:id/movies ::`);
    console.log(`${API_BASE_URL}/person/${req.params.id}/movie_credits?api_key=${API_KEY}`);

    res.status(400).json({ error: 'not implemented' });
});


app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});

module.exports = app;
