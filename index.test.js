const chai = require('chai');
chai.use(require('chai-as-promised'));
const should = chai.should();
const request = require('supertest');

const app = require('./index');

describe('Movie Madness API', () => {
    describe('Searching Movies', () => { 
        it('should return json', (done) => {
            request(app)
                .get('/movie/search')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
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
