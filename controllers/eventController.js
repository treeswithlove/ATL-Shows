const express = require('express');
const router = express.Router();
const Schema = require('../db/schema.js');
const VenueModel = Schema.VenueModel;
const EventModel = Schema.EventModel;

//index
router.get('/events', (req,res) => {
    const venueId = req.params.id;
    const eventId = req.params.id;
    VenueModel.findById(venueId)
        .then((venue) => {
            res.render('events/event', {
                venue
            })
        }).catch((error) => {
            console.log(error);
        });
});

