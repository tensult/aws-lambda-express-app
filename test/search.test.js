const request = require('supertest');
const app = require('../app');

describe('Search', () => {

    it('should search article with valid data', (done) => {
        request(app).post('/search').send({
            category: 'SPORTS',
            text1: 'football'
        }).expect(200, done);
    });

    it('search article with invalid data', (done) => {
        request(app).post('/search').send({
            category: 'ENTERTAINMENT',
            text1: 'hello12345'
        }).expect(500, done);
    });
});