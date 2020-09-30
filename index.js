const Twit = require("twit");
const dotenv = require("dotenv");
var schedule = require("node-schedule");

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
    q: `#dailyInspiration OR #100DaysOfCode`,
    count: 15,
  };
  T.get("search/tweets", params, (err, data, response) => {
    let tweets = data.statuses;

    if (!err) {
      for (let dat of tweets) {
        let retweetId = dat.id_str;
        T.post("statuses/retweet/:id", { id: retweetId }, (err, response) => {
          if (response) console.log("Retweeted! " + retweetId);
          if (err) console.log("Something went wrong! Maybe a duplicate.");
        });
      }
    }
  });
}
setInterval(retweet, 10000);

schedule.scheduleJob("0 0 0 13 8 *", function () {
  T.post(
    "statuses/update",
    {
      status:
        "Today is the birthday of my creator @victorkarangwa4 \n Help me to wish him HAPPY BIRTHDAY  🥳🙌🎂🍰",
    },
    function (err, data, response) {
      if (response) console.log("Tweeted! " + data);
      if (err) console.log(err);
    }
  );
});

schedule.scheduleJob("0 0 0 1 10 *", function () {
  T.post(
    "statuses/update",
    {
      status:
        "May all that you do in this new month be productive and successful. Happy New Month to you all!",
    },
    function (err, data, response) {
      if (response) console.log("Tweeted! " + data);
      if (err) console.log(err);
    }
  );
});
