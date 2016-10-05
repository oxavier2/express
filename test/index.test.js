var expect = require('chai').expect;
var request = require('supertest');

var app = require('../index');

describe('index', function() {
 it('GET /sums/:first/:second', function(done) {
   request(app)
     .get('/sums/1/2')
     .expect(200, '3')
     .end(done);
});
 it('POST /postit', function(done){
   request(app)
    .post('/postit')
    .field('name', 'Orlando')
    .field('lastname', 'Alverio')
    .expect(200, 'Hello, Orlando')
    .end(done);
 });
 it('GET *', function(done) {
   request(app)
     .get('/whatever')
     .expect(404, 'I dont know this url')
     .end(done);
 });
 it('POST *', function(done) {
   request(app)
     .get('/whatever')
     .expect(404, 'I dont know this url')
     .end(done);
  });
});
