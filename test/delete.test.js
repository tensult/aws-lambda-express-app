
var request = require('supertest');
var app = require('../app');

describe('Delete app', function () {

    it('should delete article when valid inputs are passed', function (done) {
        request(app).post('/delete').send({
            ID: "art-017",
        }).expect(200, done); 
    });
    it('should delete article when invalid inputs are passed', function (done) {
        request(app).post('/delete').send({
        }).expect(404, done); 
    });

});


