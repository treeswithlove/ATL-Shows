const express = require('express');
const router = express.Router();
const Schema = require('../db/schema.js');
const VenueModel = Schema.VenueModel;
const EventModel = Schema.EventModel;

//new
router.get('/events', (req,res) => {
    //get the event id 
    const venueId = req.params.id;
    VenueModel.findById(venueId)
        .then((venue) => {
            res.render('events/event', {
                venue
            })
        }).catch((error) => {
            console.log(error);
        });
});

