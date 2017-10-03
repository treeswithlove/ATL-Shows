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

 
//removes venues
VenueModel.remove({}, function (err) {
    console.log(err);
 });   


//create a theatre for the Venue Model
const allainceTheatre = new VenueModel({name: 'The Alliance Theater', address: '1280 Peachtree St NE, Atlanta, GA 30309'});
const dadsGarage = new VenueModel({name: 'Dad\'s Garage', address:'569 Ezzard St SE, Atlanta, GA 30312'});
const stagesTheatre = new VenueModel({name: '7 Stages Theatre', address:' 1105 Euclid Ave NE, Atlanta, GA 30307'});



//create an event for the Event Model
const pippinMusical = new EventModel({category:'play',title:'Pippin Musical', address:'1280 Peachtree St NE, Atlanta, GA 30309',cost:100, date: Date.now()})
const evitaMusical = new EventModel({category:'play',title:'Evita Musical', address:'1280 Peachtree St NE, Atlanta, GA 30309', cost:200, date: Date.now()})



//assign events to venues
const venues = [allainceTheatre,dadsGarage,stagesTheatre];
const events = [pippinMusical, evitaMusical];


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



