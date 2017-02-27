const chai = require('chai');
const should = chai.should();
const request = require('supertest');

const app = require('./index');

describe('Movie Madness API', () => {
    describe('/movies search', () => {
        it('should return json', (done) => {
            request(app)
                .get('/movie')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
});
