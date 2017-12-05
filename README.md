# Northcoders News Back-End

API for the reddit-style northcoders news, using Node.js, express and a MongoDB. The API is hosted on heroku [here](https://godsmark-news.herokuapp.com/).

The website using this API is hosted on heroku [here](https://read-godsmark-news.herokuapp.com/).

## Getting Started

To run this back-end on your local machine for development and testing purposes follow these guidelines.


### Prerequisites

Built on Node.js v8.6.0 and MongoDB v3.4.10. You will need Node.js and MongoDB installed locally.

### Seed the database

Install dependencies
```
$ npm install
```

Make sure a local MongoDB instance is running on port 27017
```
$ mongod
```

Run the seed file with node
```
$ node seed/seed.js
```

The process can take up to a couple of minutes to complete as there is a lot of data.
Once the process is complete you will see the log line 'Database Seeded' and the node process will exit.


### Deploy API

Execute
```
$ npm install
```

And when finished

```
$ npm start
```

It should be available in your [localhost:3000](http://localhost:3001/api/articles)


## Running the tests

Run the tests in the mocha test environment
```
$ npm test
```

## Built With

* [MongoDB](www.mongodb.com)
* [Express](https://expressjs.com/)
* [Mongoose](http://mongoosejs.com/)
* [mLab](https://mlab.com/welcome/)
* [Heroku](https://heroku.com)

## Authors

* **Kerry Godsmark** - [Kerry](https://github.com/kgodsmark)


## Acknowledgments

* Northcoders coding bootcamp
* Reddit

