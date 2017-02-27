const chai = require('chai');
chai.use(require('chai-as-promised'));
const should = chai.should();
const request = require('supertest');

const app = require('./index');

describe('Movie Madness API', () => {
    describe('Searching Movies', () => {
        it('should return json and error for empty query', () => {
            return request(app)
                .get('/movie/search')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400);
        }).timeout(5000);

        it('should search by partial match string and return the first movie by default', () => {
            return request(app)
                .get('/movie/search?query=hunting')
                .expect(200)
                .then(res => {
                    movie = res.body
                    movie.id.should.equal(489);
                    movie.original_title.should.match(/hunting/i);
                });
        }).timeout(5000);

        it.skip('should be able to return up to a specified number of search results', () => {
            let numMovies = 50;
            return request(app)
                .get(`/movie/search?date=2000&num_results=${numMovies}`)
                .expect(200)
                .then(res => {
                    movies = res.body;
                    movies.length.should.equal(numMovies);
                });
        });
    });

    describe('6 Degrees of Kevin Bacon', () => {
        it.skip('should provide the number of degrees of movie-separation for two given actors', () => {
            let actor1 = '';
            let actor2 = '';

            //Get acted-in :: https://api.themoviedb.org/3/person/6384/movie_credits
            //Get cast-of -- https://api.themoviedb.org/3/movie/561/credits


            return request(app)
                .get(`/complex/6deg?actor1=${actor1}&actor2=${actor2}`)
                .expect(200)
                .then(res => {
                    results = res.body;
                    results.degrees.should.equal();

                });
        });

    });

    describe('Movie Details', () => {
        it('should error if id is not an integer', (done) => {
            request(app)
                .get('/movie/id/hehehe')
                .expect('Content-Type', /json/)
                .expect(404, done);
        });

        it('should return the right movie for an id', () => {
            return request(app)
               .get('/movie/id/1262')
               .expect('Content-Type', /json/)
               .expect(200)
               .then(res => {
                    res.body.id.should.equal(1262);
                    res.body.original_title.should.match(/stranger than fiction/i);
               });
        }).timeout(5000);

    });
});
