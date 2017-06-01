const chai = require('chai');
chai.use(require('chai-as-promised'));
const should = chai.should();
const request = require('supertest');

const app = require('./index');

describe('API System Tests :: ', () => {
    describe('Searching for actor', () => {

        it('should return json details for Kevin Bacon', () => {
            return request(app)
                .get('/actor/search/kevin%20bacon')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    res.body.id.should.equal('4724');
                    res.body.name.should.equal('Kevin Bacon');
                })
        }).timeout(5000);

    });

    describe('Get movie credits', () => {
        it('should return json movie credits for actor id 4724', () => {
            return request(app)
                .get('/actor/4724/movies')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    let result = res.body.results[0];
                    result.name.should.equal('Kevin Bacon');
                    result.id.should.equal('4724');
                })
        }).timeout(5000);
    })
});
