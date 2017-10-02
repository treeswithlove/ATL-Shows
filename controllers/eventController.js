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
//post event
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

//show route
router.get('/:eventId', (req,res) => {
    const venueId = req.params.venueId;
    const eventId = req.params.eventId;
    VenueModel.findById(venueId)
        .then((venue) => {
            console.log(venue)
            res.render('venues/show',{
                venue : venue,
                event: event
        }).catch((error) => {
            console.log(error)
        })
    });
});

//edit route
router.get('/:eventId/edit', (req,res) => {
    const venueId = req.params.venueId;
    const eventId = req.params.eventId;
    VenueModel.findById(venueId)
        .then((venue) => {
        const event = venue.events.id(eventId)
            res.render('events/edit',{
                event,
                venueId
        }).catch((error) => {
            console.log(error)
        })
    });
});



//update route
router.put('/:eventId', (req,res) => {
    const venueId = req.params.venueId;
    const eventId = req.params.eventId;
    const updatedEvent = req.body;
    VenueModel.findById(venueId)
    .then((venue) => { 
        const event = venue.events.id(eventId)
        console.log(event.title)
        
        event.title = updatedEvent.title;
        event.address = updatedEvent.address;
        event.cost = updatedEvent.cost;

        return venue.save()
    })
            .then(() => {
                res.redirect(`/venues/${venueId}`)
            }).catch((error) => {
                 console.log(error)
         });
    });

//delete event
router.get('/:eventId/delete', (req,res) => {
    const venueId = req.params.venueId;
    const eventId = req.params.eventId;

    VenueModel.findById(venueId)
        .then((venue) => {
                const event = venue.events.id(eventId).remove()
                return venue.save()
        })
        .then(() => {
            res.redirect(`/venues/${venueId}`)
        })


}); 

module.exports = router;
