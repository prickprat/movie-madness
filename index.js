const express = require('express');
const request = require('request-promise-native');
const ENV_DEFS = require('./environment');
const PORT = ENV_DEFS.PORT;
const API_KEY = ENV_DEFS.API_KEY;
const API_BASE_URL = ENV_DEFS.API_BASE_URL;

let app = express();

// search actor : https://api.themoviedb.org/3/search/person?query={name}&api_key={api_key}
// get acted-in :: https://api.themoviedb.org/3/person/{actor_id}/movie_credits?api_key={api_key}
// get cast-of -- https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key={api_key}
function find(path, query) {
    return request({
        method: 'GET',
        url: API_BASE_URL + path,
        json: true,
        qs: Object.assign({api_key: API_KEY}, query)
    });
}
function search(path, query, res) {
    return find(path, query).catch(err => res.status(500).send({message: 'error', meta: err}))
}
app.get('/actor/search/:name', (req, res) => {
    console.log('API :: /actor/search ::');
    const searchName = req.params.name;
    // const requestUrl = `${}?&`;
    // console.log(requestUrl);
    return search('/search/person', {query: searchName}, res)
    .then(body => {
        // console.log(body);
        if (body.results.length > 0) {
            return res.status(200).send(body.results[0]);
        } else {
            return res.status(404).send({message: searchName + ' not found'})
        }
    });
    // res.status(400).json({ error: 'not implemented' });
});

app.get('/actor/:id/movies', (req, res) => {
    // console.log(`API :: /actor/:id/movies ::`);
    // console.log(`${API_BASE_URL}?api_key=${API_KEY}`);

    search(`/person/${req.params.id}/movie_credits`, {}, res)
    .then(body => {
        // console.log(body);

        return res.status(200).send({
            movies: body.cast.map(cast => ({id: cast.id, title: cast.title}))
        });

    });
});

app.get('/movie/:id/actors', (req, res) => {
    search(`/movie/${req.params.id}/credits`, {}, res)
    .then(body => {
        return res.status(200).send({
            cast: body.cast.map(member => ({id: member.id, name: member.name}))
        })
    })
})

app.get('/actor/:name/kevin', (req, res) => {
    // console.log(`API :: /actor/:id/movies ::`);
    // console.log(`${API_BASE_URL}?api_key=${API_KEY}`);

    // movies = find all movies for actor x
    // for each movie in movies
    //   find crew for movie
    // for each crew
    //   if crew.name === 'Kevin Bacon' stop
    const allCast = {}
    const allMovies = {}

    let start;
    find('/search/person', {query: searchName})
    .then(body => {
        // console.log(body);
        if (body.results.length > 0) {
            const result = body.results[0]
            start = {id: result.id, name: result.name};
            return  search(`/movie/${result.id}/credits`, {}, res);
        } else {
            return Promise.reject({code: 404, message: 'actor not found'})
        }
    })
    .then(body => {
        const movies = body.cast.map(cast => ({id: cast.id, title: cast.title}));
        movies.forEach(movie => {
            allMovies[movie.id] = allMovies[movie.id] || movie;
            allMovies[movie.id].cast = allMovies[movie.id].cast || {};
            allMovies[movie.id].cast[start.id] = start
        })
        return Promise.all(movies => find(`/movie/${movie.id}/credits`))
        .then(crewPerMovie => {
            crewPerMovie.forEach((crew, index) => {
                const kevinIndex = crew.indexOf(member => member.name === 'Kevin Bacon')
                if (kevinIndex >= 0) {

                }
            });
        })
    })
    .catch(err => {
        res.status(err.code ? err.code : 500).send({message: err.message, meta: err}))
});


app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});

module.exports = app;
