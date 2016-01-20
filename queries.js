/* Fill out these functions using Mongoose queries*/
var mongoose = require('mongoose'),
    Listing = require('./ListingSchema.js'),
    config = require('./config');

mongoose.connect(config.db.uri);


var findLibraryWest = function() {
    /*
     Find the document that contains data corresponding to Library West,
     then log it to the console.
     */

    Listing.find({name:"Library West"}, function(err,listing){

        if(err){
            console.log(err);
            return;
        }

        console.log(listing);

    });
};

var removeCable = function() {
    /*
     Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed
     on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
     and remove this listing from your database and log the document to the console.
     */
    Listing.findOneAndRemove({code:"CABL"}, function(err, listing){

        if(err){
            console.log(err);
            return;
        }

        if(!listing){
            console.log("There was no listing with the code: 'Cabl' found");
        }
        else{
            console.log(listing);
        }
    });
};

var updatePhelpsMemorial = function() {
    /*
     Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then
     log the updated document to the console.
     */

    Listing.findOneAndUpdate({name: "Phelps Laboratory"},
        {
            $set:{
                addresss:'100 Phelps Lab, Gainesville, FL 32611',
                coordinates:{latitude:29.644909, longitude: -82.348841}
            }
        },

        {new:true},

        function(err, listing){
            if(err){
                throw err;
            }
            console.log(listing);

        }
    );
};
var retrieveAllListings = function() {
    /*
     Retrieve all listings in the database, and log them to the console.
     */

    Listing.find({}, function (err, listing) {
        if (err) {
            throw err;
        }

        console.log(listing);


    }).exec(function(){
        mongoose.disconnect();
    });
};

    findLibraryWest();
    removeCable();
    updatePhelpsMemorial();
    retrieveAllListings();
    mongoose.disconnect();