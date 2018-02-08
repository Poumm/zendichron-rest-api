let dbUrl;
let allowOrigin;

if (process.env === null) {
  dbUrl =
    "mongodb://heroku_vt6fzffx:j53rlop3u824imtkglit49o440@ds125588.mlab.com:25588/heroku_vt6fzffx";
  allowOrigin = "https://zendichron.herokuapp.com";
} else if ((process.env.NODE_ENV = "test")) {
  dbUrl = "mongodb://localhost/zendichron_test";
  dbUrl =
    "mongodb://heroku_vt6fzffx:j53rlop3u824imtkglit49o440@ds125588.mlab.com:25588/heroku_vt6fzffx";
} else {
  dbUrl = "mongodb://localhost/zendichron";
  allowOrigin = "http://localhost:3000";
}
const config = { allowOrigin: allowOrigin, dbUrl: dbUrl };
module.exports = config;
