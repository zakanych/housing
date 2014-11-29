var express = require('express');
var app = express();
var expect = require('chai').expect;
var request = require('supertest');
var Promise = require('bluebird');

var dataSavedJob;

var db = {
    findJobs: function(){
        return new Promise(function(resolve, reject){
            resolve(['hi']);
        })
    },
    saveJob: function(job){
        dataSavedJob = job;
    }
};

var jobService = require('../../jobs-service')(db, app);

describe('get jobs', function(){
   it('get should give me a list of jobs', function(done){
       request(app).get('/api/jobs')
       .expect('Content-Type', /json/)
       .end(function(req, res){
           expect(res.body).to.be.a('Array');
           done();
       });
   });
});

describe('save jobs', function(){
    it('should validate the title is greater than 4 characters');
    it('should validate the title is less than 40 characters');
    it('should validate the description is greater than 4 characters');
    it('should validate the description is less than 250 characters');
    
    var newJob = {    title: 'Coock',    description: 'You will be making bagels'};
    
    it('should pass the job to the database save', function(done){
        request(app).post('/api/jobs').send(newJob).end(function(err, res){
            expect(dataSavedJob).to.deep.equal(newJob);
            done();
        });
    });
    it('should return a status of 200 to the front end if the database saved');
    it('should return a job with an id');
    it('should return an error if the database failed');
});