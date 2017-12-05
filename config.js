module.exports = {
    DB: {
      test: 'mongodb://localhost/northcoders-news-api-test',
      dev: 'mongodb://localhost/northcoders-news-api',
      production: 'mongodb://kgodsmark:ncnews1234@ds121336.mlab.com:21336/nc_news_data'
    },
    PORT: {
      test: 3090,
      dev: 3001,
      production: process.env.PORT
    }
  };
