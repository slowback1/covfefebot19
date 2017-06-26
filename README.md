[ covfefe bot19 ]
By: Drew Wobeck (Slowback1)

What the bot does:  On admin command, the bot dumps the previous ~4000 tweets from the twitter user realDonaldTrump and places them into a .csv file, where they are stored for later use.  When running, the bot will perform the following steps at 12 noon US Pacific on each day:

1. Pull a tweet from the aformentioned .csv file at random.
2. If the tweet is 114 characters or longer, the bot will remove characters until the given tweet is of an appropriate length.
3. The bot will then remove at least last 2 words from the tweet (a word is denoted by a space).  It will then at random continue to remove words until it "decides" to stop (again, at random).
4. The bot will add quotation marks to the beginning and end of the tweet, and add "covfefe -@realDonaldTrump" to the end of the tweet.
5. The bot finally posts the altered tweet to its own twitter account.  It does NOT interact with other users in any way.

An example: 
    
    Input: "It was a great honor to welcome President Petro Poroshenko of Ukraine to the White House today with @VP Pence"
    
    Output: "It was a great honor to welcome President Petro Poroshenko of Ukraine to the covfefe" -@realDonaldTrump


The bot is mostly written in node.js and python.

node.js modules used: 
    1. async
    2. cron
    3. csvtojson
    4. express
    5. socket.io
    6. twit