'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri);
/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */

//read listings.json
var listings = JSON.parse(fs.readFileSYnc('listings.json', 'utf8')).entries

//Adds entries from listings.json to the db
var entries_counter = 0;
var callback = function(err){
    if(err){
        throw err;
    }
    entries_counter++;
    if(entries_counter == (listings.length)){
        console.log(listings.length + " listing entries added to mongolab.")
        mongoose.disconnect();
    }
}

for(var i = 0; i < listings.length; ++i){
    new Listing(listings[i])
        .save(callback);
}

/*
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */