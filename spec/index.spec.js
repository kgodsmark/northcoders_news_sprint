process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const { expect } = require('chai');
const saveTestData = require('../seed/test.seed');
const { Articles, Comments, Users, Topics } = require('../models/models');

describe('API', () => {
    let userData;
    beforeEach(() => {
        return mongoose.connection.dropDatabase()
            .then(saveTestData)
            .then((data) => {
                userData = data;
            })
            .catch((err) => console.log('error', err))
    });

    describe('GET /ARTICLES', () => {
        it('sends back the correct object with a status code of 200', () => {
            return request
                .get('/api/articles')
                .expect(200)
                .then(res => {
                    expect(res.body.articles).to.be.an('array')
                    expect(res.body.articles.length).to.equal(2)
                    expect(res.body.articles[0].title).to.be.a('string')
                });
        });
    });

    describe('GET /TOPICS', () => {
        it('sends back the correct object with a status code of 200', () => {
            return request
                .get('/api/topics')
                .expect(200)
                .then(res => {
                    expect(res.body.topics).to.be.an('array')
                    expect(res.body.topics.length).to.equal(3)
                    expect(res.body.topics[0].title).to.be.a('string')
                });
        });
    });

    describe('GET /TOPICS/:TOPIC/ARTICLES', () => {
        it('sends back the correct specified article object with a status code of 200', () => {
            return request
                .get('/api/topics/football/articles')
                .expect(200)
                .then(res => {
                    expect(res.body.article).to.be.an('array')
                    expect(res.body.article.length).to.equal(1)
                    expect(res.body.article[0].belongs_to).to.equal('football')
                });
        });
        it('sends back a 404 response for an incorrect topic', () => {
            return request
                .get('/api/topics/wrong/articles')
                .expect(404)
                .then(res => {
                    expect(res.body.msg).to.equal('page not found')
                });
        });
    });


});