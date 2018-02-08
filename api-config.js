let dbUrl;

if (process.env === null) {
  dbUrl =
    "mongodb://heroku_vt6fzffx:j53rlop3u824imtkglit49o440@ds125588.mlab.com:25588/heroku_vt6fzffx";
} else if ((process.env.NODE_ENV = "test")) {
  dbUrl = "mongodb://localhost/zendichron_test";
} else {
  dbUrl = "mongodb://localhost/zendichron";
}

module.exports = dbUrl;
