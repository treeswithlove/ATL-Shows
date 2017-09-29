const express = require('express');
const router = express.Router();
const Schema = require('../db/schema.js');
const VenueModel = Schema.VenueModel;
const EventModel = Schema.EventModel;

//shows all the events
router.get('/:venueId', (req,res) => {
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

//new route for a single play
router.get('/new', (req,res) => {
    res.render('events/new')
});






//delete event
// router.get('/:eventId/delete', (req,res) => {
//     const venueId = req.params.venueId;
//     const eventId = req.params.eventId;
//     VenueModel.findByIdAndRemove(venueId)
//     const event = venue.event.id(eventId).remove()
//         return venue.save()
//         .then(() =>{ 
//             res.redirect(`/venues/${venueId}/events`)
//         });
// }); 


