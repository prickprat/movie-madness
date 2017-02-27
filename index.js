const express = require('express');
// const https = require('https');
const util = require('util');
const requester = require('request-promise-native');

const ENV_DEFS = require('./environment');
const PORT = ENV_DEFS.PORT;
const API_KEY = ENV_DEFS.API_KEY;
const API_BASE_URL = ENV_DEFS.API_BASE_URL;

let app = express();

app.get('/movie/search', (req, res) => {
    console.log('API :: /movie/search ::');
    queryString = req.query.query;
    let api_url = `api_key=${API_KEY}&query=${queryString}`;
    let apiRequestOpts = {
        uri: `${API_BASE_URL}/search/movie/`,
        qs: {
            api_key: API_KEY,
            query: queryString,
        },
        json: true,
    };

    requester(apiRequestOpts)
        .then(apiRes => {
            console.log('here');
            if (apiRes.total_results > 0){
                res.status(200).json(apiRes.results[0]);
            } else {
                res.status(200).json({});
            }
        })
        .catch(err => {
            console.log('there');
            res.status(400).json(err);
        });
});

app.get('/movie/id/:id', (req, res) => {
    console.log('API :: /movie/id ::');

    let id = parseInt(req.params.id, 10);
    if (isNaN(id)){
        res.status(404).json({
            error: 'id must be an integer',
        });
        return;
    }
    let api_url = `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}`;

    console.log(`Requesting URL:${api_url} :: `);
    require('https').get(api_url, (api_res) => {
        console.log(`api_res status : ${api_res.statusCode}`);
        let body = '';

        api_res.on('data', (chunk) => {
            body += chunk;
        });

        api_res.on('end', () => {
            let jsonBody = JSON.parse(body);
            res.json(jsonBody);
        });
    }).on('error', (err) => {
        console.error('Error: /movie/id - ' + err.message);
    });


});

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});

module.exports = app;
