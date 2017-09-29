const express = require('express');
const router = express.Router({mergeParams: true});
const Schema = require('../db/schema.js');
const VenueModel = Schema.VenueModel;
const EventModel = Schema.EventModel;

//shows all the events
router.get('/', (req,res) => {
    const venueId = req.params.venueId;
    VenueModel.findById(venueId)
        .then((venue) => {
            res.render('venues/show', {
                venue
        }).catch((error) => {
            console.log(error);
        });
    });
});

// //new route for a single play
router.get('/new', (req,res) => {
    const venueId = req.params.venueId;
    res.render('events/new', {
        venueId
    })
});

router.post('/', (req,res) => {
    const venueId = req.params.venueId;
    const newEvent = req.body;
    VenueModel.findById(venueId)
    .then((venue)=> {
        venue.events.push(newEvent)
            return venue.save()
    .then((venue)=> {
        res.redirect(`/venues/${venueId}`)
    }).catch((error) => {
        console.log('error:' + error);
    });
    });
});


//delete event
router.get('/:eventId/delete', (req,res) => {
    const venueId = req.params.venueId;
    const eventId = req.params.eventId;

    VenueModel.findById(venueId)
        .then((venue) => {

        });


}); 

module.exports = router;
