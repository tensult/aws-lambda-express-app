
var request = require('supertest');
var app = require('../app');

describe('Create app', function () {
    it('should create article when valid inputs are passed', function (done) {
        request(app).post('/create').send({
            category: "SPORTS",
            ID: "Art01",
            title: "Some title",
            Description: "Some description"
        }).expect(200, done);
    });
    it('should not create article when no inputs are passed', function (done) {
        request(app).post('/create').send({
        }).expect(400, done).expect((err) => {
            console.log(err.statusCode);
        });
    });
});


