/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    coordinates: {
        lat: Number,
        long: Number
    },
    address: String,
    updated_at: Date,
    created_at: Date
});


/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
listingSchema.pre('save', function(next) {
  if(!this.code || !this.name){
      var err = new Error('Save of listing failed due to missing required field(s)[name, code]')
      next(err);
  }

    var curr_time = Date.now();

    if(!this.created_at)
    this.created_at = curr_time;

    this.updated_at = Date.now;

    console.log("****Saved Listing****");
    console.log(this);
    console.log("*********************\n")

    next();
});


listingSchema.pre('findOneAndUpdate', function(next){
    this.findOneAndUpdate({}, {updated_at: Date.now() });
    next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
