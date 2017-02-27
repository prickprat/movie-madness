const express = require('express');

const PORT = 3000;
let app = express();

app.get('/movidsse', (request, response) => {
    console.log('Here');
});

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});

module.exports = app;
