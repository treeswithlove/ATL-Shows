const express = require('express');
const router = express.Router({mergeParams: true});
const Schema = require('../db/schema.js');
const VenueModel = Schema.VenueModel;
const EventModel = Schema.EventModel;
const moment = require('moment');


//shows all the events
router.get('/', (req,res) => {
    const venueId = req.params.venueId;
    VenueModel.findById(venueId)
        .then((venue) => {
            res.render('events/index', {
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
        const event = venue.events.id(eventId)
        const date = moment(event.date)
        const dateComponent = moment.utc(date).local().format('MM/DD/YYYY, h:mm p');
            res.render('events/show',{
                
                venueId : venueId,
                event: event,
                dateComponent
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
        
        event.title = updatedEvent.title;
        event.address = updatedEvent.address;
        event.cost = updatedEvent.cost;
        event.date = updatedEvent.date;        
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
