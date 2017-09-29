const express = require('express');
const router = express.Router();
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
    const newEvent = req.body;
    EventModel.create(newEvent)
    .then(()=> {
        res.redirect('events/')
    }).catch((error) => {
        console.log('error:' + error);
    });
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

module.exports = router;
