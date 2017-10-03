const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema =  new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

//Schema for Events will be created
const EventSchema = new Schema({
    category:{
            type: String
        },
    title: {
        type: String,
        required: true
    },
   
    address:{
        type: String,
        required: true
    },
    cost:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now
    },
    image:{
        type: String
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
const UserModel = mongoose.model('User', UserSchema);
const VenueModel = mongoose.model('Venue', VenueSchema);
const EventModel = mongoose.model('Event', EventSchema);





module.exports = {
    UserModel : UserModel,
    VenueModel : VenueModel,
    EventModel : EventModel
}


