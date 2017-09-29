const express = require('express');
const router = express.Router();
const Schema = require('../db/schema.js');
const VenueModel = Schema.VenueModel;
const EventModel = Schema.EventModel;

//index
router.get('/', (req,res) => {
    VenueModel.find({})
        .then((venues) => {
            res.render('venues/venue', {
                venues
            }).catch((error)=> {
                console.log(error)
            })
        });
});

//new route
router.get('/new', (req,res) => {
    res.render('venues/new')
});

//post route
router.post('/', (req,res) => {
    const newVenue = req.body;
    //create and save newVenue
    VenueModel.create(newVenue)
    //Then once save 
    .then(()=> {
    //redirect to venue page
        res.redirect('/venues')
    }).catch((error) => {
        console.log('error:' + error);
    });
});


//show route
router.get('/:event_id', (req,res) => {
    const venue_id = req.params.id;
    const event_id = req.params.id; 
    
    VenueModel.find(venue_id)
        .then((venues) => {
            const event = venues.event.id(event_id)
            res.render('events/show',{
                venue_id,
                event_id
        }).catch((error) => {
            console.log(error)
        })
});

});


module.exports = router;


