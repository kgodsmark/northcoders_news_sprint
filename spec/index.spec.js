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

    describe('GET /ARTICLES/:ARTICLE_ID', () => {
        it('sends back the correct object with a status code of 200', () => {
            return request
                .get(`/api/articles/${userData.comments[0].belongs_to}`)
                .expect(200)
                .then(res => {
                    expect(res.body.article).to.be.an('array')
                    expect(res.body.article.length).to.equal(1)
                    expect(res.body.article[0].title).to.be.a('string')
                });
        });
        it('sends back a 404 response for an incorrect topic', () => {
            return request
                .get('/api/articles/1234')
                .expect(400)
                .then(res => {
                    expect(res.body.msg).to.equal('bad request')
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
                    expect(res.body.articles).to.be.an('array')
                    expect(res.body.articles.length).to.equal(1)
                    expect(res.body.articles[0].belongs_to).to.equal('football')
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

    describe('GET /ARTICLES/:ARTICLE_ID/COMMENTS', () => {
        it('sends back the correct specified article object with a status code of 200', () => {
            return request
                .get(`/api/articles/${userData.comments[0].belongs_to}/comments`)
                .expect(200)
                .then(res => {
                    expect(res.body.comments).to.be.an('array')
                    expect(res.body.comments.length).to.equal(2)
                    expect(res.body.comments[0].belongs_to).to.be.a('string')
                });
        });
        it('sends back a 404 response for an incorrect article id', () => {
            return request
                .get('/api/articles/1234/comments')
                .expect(400)
                .then(res => {
                    res.body
                    expect(res.body.msg).to.equal('bad request')
                });
        });
    });

    describe('POST /ARTICLES/:ARTICLE_ID/COMMENTS', () => {
        it('saves a new comment to the article with a status code of 201', () => {
            return request
                .post(`/api/articles/${userData.comments[0].belongs_to}/comments`)
                .send({ body: "This is my new comment", belongs_to: `${userData.comments[0].belongs_to}`, created_by: 'northcoders' })
                .expect(201)
                .then(res => {
                    expect(res.body.comments).to.be.an('array');
                    expect(res.body.comments.length).to.equal(3);
                    expect(res.body.comments[2].body).to.be.a('string')
                });
        });
        it('sends back a 400 response for a bad request', () => {
            return request
                .post('/api/articles/1234/comments')
                .send({ body: "This is my new comment", belongs_to: '1234', created_by: 'northcoders' })
                .expect(400)
                .then(res => {
                    expect(res.body.msg).to.equal('bad request')
                });
        });
    });

    describe('PATCH /ARTICLES/:ARTICLE_ID/', () => {
        it('increments the vote by +1 when vote=up', () => {
            return request
                .patch(`/api/articles/${userData.articles[0]._id}?vote=up`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.article[0].votes).to.equal(1);
                });
        });
        it('increments the vote by -1 when vote=down', () => {
            return request
                .patch(`/api/articles/${userData.articles[1]._id}?vote=down`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.article[0].votes).to.equal(-1);
                });
        });

        it('no increment if not valid query', () => {
            return request
                .patch(`/api/articles/${userData.articles[0]._id}?vote=hello`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.article[0].votes).to.equal(0);
                });
        });
    });

    describe('PATCH /COMMENTS/:COMMENT_ID/', () => {
        it('increments the vote by +1 when vote=up', () => {
            return request
                .patch(`/api/comments/${userData.comments[0]._id}?vote=up`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.comments[0].votes).to.equal(1);
                });
        });
        it('increments the vote by -1 when vote=down', () => {
            return request
                .patch(`/api/comments/${userData.comments[0]._id}?vote=down`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.comments[0].votes).to.equal(-1);
                });
        });

        it('no increment if not valid query', () => {
            return request
                .patch(`/api/comments/${userData.comments[0]._id}?vote=hello`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object');
                    expect(res.body.comments[0].votes).to.equal(0);
                });
        });
    });

    describe('DELETE /COMMENTS/:COMMENT_ID/', () => {
        it('deletes a comment by comment ID', () => {
            return request
                .delete(`/api/comments/${userData.comments[0]._id}`)
                .expect(202)
                .then(res => {
                    expect(res.body.comments[0]._id).to.equal(`${userData.comments[1]._id}`);
                })
                .then(() => {
                    return request
                        .get(`/api/articles/${userData.comments[0].belongs_to}/comments`)
                        .expect(200)
                        .then(res => {
                            expect(res.body.comments).to.be.an('array')
                            expect(res.body.comments.length).to.equal(1)
                            expect(res.body.comments[0].belongs_to).to.be.a('string')
                        });
                });
        });

        it('returns error message if incorrect parameter', () => {
            return request
                .delete(`/api/comments/1234`)
                .expect(400)
                .then(res => {
                    expect(res.body.msg).to.equal('bad request');
                })
        });
    });

    describe('GET /USERS/:USERNAME', () => {
        it('sends back the correct object with a status code of 200', () => {
            return request
                .get('/api/users/northcoder')
                .expect(200)
                .then(res => {
                    expect(res.body.user).to.be.an('array')
                    expect(res.body.user.length).to.equal(1)
                    expect(res.body.user[0].username).to.be.a('string')
                });
        });
        it('sends an error message if user doesn\'t exist', () => {
            return request
                .get('/api/users/kerry')
                .expect(404)
                .then(res => {
                    expect(res.body.msg).to.equal('page not found')
                });
        });
    });

    describe('GET /USERS/:USERNAME/REPOS', () => {
        it('sends back the correct object with a status code of 200', () => {
            return request
                .get('/api/users/northcoder/repos')
                .expect(200)
                .then(res => {
                    expect(res.body.articles).to.be.an('array')
                    expect(res.body.articles.length).to.equal(2)
                    expect(res.body.articles[0].created_by).to.be.a('string')
                });
        });
        it('sends an error message if user doesn\'t exist', () => {
            return request
                .get('/api/users/kerry/repos')
                .expect(404)
                .then(res => {
                    expect(res.body.msg).to.equal('page not found')
                });
        });
    });

});