const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Schema for Events will be created
const PlaysSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    cost:{
        type:Number,
        required: true
    },
    date:{
        type:Date,
        default:Date.now,
        required: true
    }
})

//Schema for how all models for venues will be created
const VenueSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    events: [EventSchema]
})


//create models for each Schema

const VenueModel = mongoose.model('Venue', VenueSchema);

//Events Model
const PlaysModel = mongoose.model('Plays', PlaysSchema);
//const ArtModel = mongoose.model('Art', ArtSchema);




//removes venues
VenueModel.remove({}, function (err) {
   console.log(err);
});



module.exports = {
    VenueModel : VenueModel,
    PlaysModel : PlaysModel
}


