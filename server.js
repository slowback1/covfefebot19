//                TO-DO
/*************************************
 * Write documentation
 * **********************************/
var fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    config = require(path.join(__dirname, 'config.js'));
const csvFilePath='/realDonaldTrump_tweets.csv';
const csv=require('csvtojson');    
var T = new Twit(config);
console.log("hi there we're just getting started");
var tweetArray = ["Democrats slam GOP healthcare proposal as Obamacare premiums &amp; deductibles increase by over 100%. Remember keep your doctor, keep your plan?", "Just out: The Obama Administration knew far in advance of November 8th about election meddling by Russia. Did nothing about it. WHY?", "Today, it was a tremendous honor for me to sign the #VAaccountability Act into law, delivering my campaign promise… https://t.co/G0k8nFWqNj", "I've helped pass and signed 38 Legislative Bills, mostly with no Democratic support, and gotten rid of massive amounts of regulations. Nice!", "Will be on @foxandfriends. Enjoy!", "RT @foxandfriends: POTUS the predictor? President Trump foretold housing upswing in 2012 https://t.co/N3LMDZKTK1", "RT @foxnation: .@SenTedCruz: I want to Get to a 'Yes' Vote: https://t.co/g0vafw4ef2", ".@FLOTUS &amp; I were honored to host our first WH Congressional Picnic. A wonderful evening &amp; tradition. @MarineBand:… https://t.co/h5L4myWmam", "Together, we are going to MAKE AMERICA GREAT AGAIN!", "I am very supportive of the Senate #HealthcareBill. Look forward to making it really special! Remember, ObamaCare is dead.", "Mexico was just ranked the second deadliest country in the world, after only Syria. Drug trade is largely the cause. We will BUILD THE WALL!", "As promised, our campaign against the MS-13 gang continues." , "...whether there are \"\"tapes\"\" or recordings of my conversations with James Comey, but I did not make, and do not have, any such recordings.", "With all of the recently reported electronic surveillance, intercepts, unmasking and illegal leaking of information, I have no idea...", "I certainly hope the Democrats do not force Nancy P out. That would be very bad for the Republican Party - and please let Cryin' Chuck stay!", "...Why did the DNC REFUSE to turn over its Server to the FBI, and still hasn't? It's all a big Dem scam and excuse for losing the election!", "...Why did Democratic National Committee turn down the DHS offer to protect against hacks (long prior to election). It's all a big Dem HOAX!", "By the way, if Russia was working so hard on the 2016 Election, it all took place during the Obama Admin. Why didn't they stop them?", "Great night in Iowa - special people. Thank you!", "Thank you Kirkwood Community College. Heading to the U.S. Cellular Center now for an 8pmE MAKE AMERICA GREAT AGAIN… https://t.co/n6LS32a6Zn", "Just landed in Iowa. See everyone soon! #MAGA🇺🇸", "Democrats would do much better as a party if they got together with Republicans on Healthcare,Tax Cuts,Security. Obstruction doesn't work!", "Well, the Special Elections are over and those that want to MAKE AMERICA GREAT AGAIN are 5 and O! All the Fake News, all the money spent = 0", "Ralph Norman ran a fantastic race to win in the Great State of South Carolina's 5th District. We are all honored by your success tonight!", "Congratulations to Karen Handel on her big win in Georgia 6th. Fantastic job, we are all very proud of you!", "Thank you @FoxNews \"\"Huge win for President Trump and GOP in Georgia Congressional Special Election.\"\"", "Things are looking great for Karen H!", "It was a great honor to welcome President Petro Poroshenko of Ukraine to the @WhiteHouse today with @VP Pence.", "While I greatly appreciate the efforts of President Xi &amp; China to help with North Korea, it has not worked out. At least I know China tried!", "The U.S. once again condemns the brutality of the North Korean regime as we mourn its latest victim."];
console.log("made it through reading that big array, good work!");
//
//snip down the tweet to an appropriate length
//
var tweetSnipper = function(phrase) {
  var longQuestionMark = phrase.length;
  if (longQuestionMark >= 110) {
    while (phrase.length >= 110) {
      var x = phrase.length;
      phrase = phrase.substr(0, x - 2);
    }
  }
  else {
    //do nothing
  }
  return phrase;
};
//
//Returns a random number in the range of min and max
//
var randomNumberinRange = function(min,max) {
  var number = (Math.floor(Math.random() * max) - min);
  return number;
};
var wordRemoval = function(phrase) {
	var result = phrase;
	console.log(result);
	var x = Math.floor(Math.random() * 10);
	  do {
    var lastIndex = result.lastIndexOf(" ");
    result = result.substring(0, lastIndex);
    x = Math.floor(Math.random() * 10);
  }while(x > 5);
  return result;
};
var covfefe = function(phrase) {
  var result = "\"" + phrase + " covfefe\" -@realDonaldTrump";
  return result;
};
console.log("Test: " + covfefe((tweetSnipper(tweetArray[randomNumberinRange(0,(tweetArray.length - 1))]))));

csv()
.fromFile(csvFilePath)
.on('json',(jsonObj)=>{
    // combine csv header row and csv line to a json object 
    // jsonObj.a ==> 1 or 4 
    console.log(jsonObj);
})
.on('done',(error)=>{
    console.log('hi');
});
csv({
    colParser:{
        "id":"omit",
        "created_at":"omit",
        "text":"string"
    },
    checkType:true
})
.on("json",(jsonObj)=>{
    console.log("hello world");
});
var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '00 00 */4 * * *',
  onTick: function() {
    /*
     * Runs once every 4 hours
     */
     if (tweetArray.length > 0) {
      var tweetPicker = randomNumberinRange(0, tweetArray.length - 1);
      console.log("tweetPicker: " + tweetPicker);
      var stepOne = tweetSnipper(tweetArray[tweetPicker]);
      console.log("Step One: " + stepOne);
      tweetArray.splice(tweetPicker);
      console.log("tweetArray: " + tweetArray);
      var stepTwo = wordRemoval(wordRemoval(wordRemoval(stepOne)));
      console.log("stepTwo: " + stepTwo);
      var stepThree = covfefe(stepTwo);
      console.log("stepThree" + stepThree);
      T.post('statuses/update', {
        status: stepThree
      },
        function(err,data,response) {
          if (err) {
            console.log('Error');
            console.log(err);
          }
          else {
            console.log(data);
          }
        });
    }
    else {
      console.log("No tweets to send out");
    }
      },
  start: false,
  timeZone: 'America/Los_Angeles'
});
job.start();

  /*  T.post('statuses/update', {
      status: 'hello world!'
    },
    function(err, data, response) {
      if (err) {
        console.log('Error');
        console.log(err);
      }
      else {
        console.log(data);
      }
    });
    */
    

      /*var stepOne = tweetSnipper(tweet);
      var stepTwo = wordRemoval(stepOne);
      var stepThree = covfefe(stepTwo);
      T.post('statuses/update', {
        status: stepThree
      },
      function(err, data, response) {
        if (err) {
          console.log('error');
          console.log(err);
        }
        else {
          console.log(data);
        }
      });*/
    //});