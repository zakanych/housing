var expect = require('chai').expect;
var mongoose = require('mongoose');
var jobModel = require('../../models/Job');
var Promise = require('bluebird');
var jobsData = require('../../jobs-data.js');

function resetJobs() {
    return new Promise(function(resolve, reject) {
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
}


describe('get jobs', function() {

    var jobs;

    before(function(done) {
        jobsData.connectDB('mongodb://77.121.201.53/housing')
            .then(resetJobs)
            .then(jobsData.seedJobs)
            .then(jobsData.findJobs)
            .then(function(collection) {
                jobs = collection;
                done();
            });
    })

    after(function() {
        mongoose.connection.close();
    });

    it('should never be empty since jobs are seeded', function() {
        expect(jobs.length).to.be.at.least(1);
    });

    it('should have a job with a title', function() {
        expect(jobs[0].title).to.not.be.empty;
    });

    it('should have a job with a description', function() {
        expect(jobs[0].description).to.not.be.empty;
    });
});

describe('db save jobs', function() {
    
    var jobs;
    var job = {title: 'Coock',  description: 'You will be making bagels'};

    function saveTestJob(){
        return jobsData.saveJob(job);
    }

    before(function(done) {
        jobsData.connectDB('mongodb://77.121.201.53/housing')
            .then(resetJobs)
            .then(saveTestJob)
            .then(jobsData.findJobs)
            .then(function(collection) {
                jobs = collection;
                done();
            });
    })

    after(function() {
        mongoose.connection.close();
    });
    
    it('should have one job after saving one job', function(){
        expect(jobs).to.have.length(1);
    });
});
