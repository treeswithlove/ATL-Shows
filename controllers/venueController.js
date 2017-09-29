const express = require('express');
const router = express.Router();
const Schema = require('../db/schema.js');
const VenueModel = Schema.VenueModel;
const EventModel = Schema.EventModel;

//index
router.get('/', (req,res) => {
    VenueModel.find({})
        .then((venues) => {
            res.render('venues/index', {
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
router.get('/:venue_id', (req,res) => {
    const venue_id = req.params.venue_id;
    VenueModel.findById(venue_id)
        .then((venue) => {
            console.log(venue)
            res.render('venues/show',{
                venue : venue
        }).catch((error) => {
            console.log(error)
        })
    });
});


module.exports = router;


