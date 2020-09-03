const Twit = require("twit");
const dotenv = require("dotenv");

dotenv.config();
const {
  APPLICATION_CONSUMER_KEY,
  APPLICATION_CONSUMER_SECRET,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET,
} = process.env;
const T = new Twit({
  consumer_key: APPLICATION_CONSUMER_KEY,
  consumer_secret: APPLICATION_CONSUMER_SECRET,
  access_token: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET,
});

function retweet() {
  let params = {
    q: `#dailyInspirations OR #100DaysOfCode OR #StaySafe`,
    count: 15,
  };
  T.get("search/tweets", params, (err, data, response) => {
    let tweets = data.statuses;

    if (!err) {
      for (let dat of tweets) {
        let retweetId = dat.id_str;
        T.post("statuses/retweet/:id", { id: retweetId }, (err, response) => {
          if (response) console.log("Retweeted! " + retweetId);
          if (err)
            console.log(
              'Something went wrong! Maybe a duplicate.'
            );
        });
      }
    }
  }); 
}
setInterval(retweet, 10000);

