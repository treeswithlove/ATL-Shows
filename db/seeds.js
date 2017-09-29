require('dotenv').config();

// Database setup
const mongoose = require('mongoose');

// Pull in Models from the `schema.js`
const Schema = require("./schema.js");
const db = mongoose.connection;

mongoose.connect(process.env.MONGODB_URI)

// Will log an error if db can't connect to MongoDB, and log 'connected to mongoDB' if success
db.on('error', ((err) =>{console.log(err);
})).once('open',(() => {console.log("Connected to MongoDB!");
    }));

//Sets schema model to variables    
const VenueModel = Schema.VenueModel;
const EventModel = Schema.EventModel;

//create a theatre for the Venue Model
const allainceTheatre = new VenueModel({name: 'The Alliance Theater', address: '100 Peachtree street'});
const allainceTheatres = new VenueModel({name: 'The Alliance Theaters', address:'200 convingtion avenue'});


//create an event for the Event Model
const pippinMusical = new EventModel({name:'Pippin Musical', address:'1280 Peachtree St NE, Atlanta, GA 30309',cost:100, date: Date.now()})


//assign events to venues
const venues = [allainceTheatre,allainceTheatres];
const events = [pippinMusical];


venues.forEach((venue) => {
    venue.events = events;
    venue.save()
        .then((venues) => {
            console.log(`${venue.name} saved`);
        })
        .catch((error) => {
            console.log(error)
        })
});
 

//disconnect db
db.close();



