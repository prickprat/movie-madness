const chai = require('chai');
chai.use(require('chai-as-promised'));
const should = chai.should();
const expect = chai.expect;
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
                    res.body.id.should.equal(4724);
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
                    res.body.movies.length.should.be.above(0);
                })
        }).timeout(5000);
    })

    it('Get actors for movie', () => {
        return request(app)
            .get('/movie/1788/actors')
            .expect(200)
            .expect('Content-Type', /json/)
            
            .then(res => {
                expect(res.body.cast.length).to.be.gt(0);
            });
    }).timeout(5000);

    it('finds Kevin from Steve Martin', ()=>{
        return request(app)
        .get('/actors/Steve%20Martin/kevin')
        .expect(200)
        .then(res => {
            expect(res.body).to.be.an.array;
        });
    });
});
