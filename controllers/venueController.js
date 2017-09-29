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
router.get('/:venueId', (req,res) => {
    const venueId = req.params.venueId;
    VenueModel.findById(venueId)
        .then((venue) => {
            console.log(venue)
            res.render('venues/show',{
                venue : venue
        }).catch((error) => {
            console.log(error)
        })
    });
});

//edit route
router.get('/:venueId/edit', (req,res) => {
    const venueId = req.params.venueId;
    VenueModel.findById(venueId)
        .then((venue) => {
            console.log(venue)
            res.render('venues/edit',{
                venue : venue
        }).catch((error) => {
            console.log(error)
        })
    });
});

//update route
// router.put('/:venueId', (req,res) => {
//     const venueId = req.params.venueId;
//     const updatedVenue = req.body;
//     VenueModel.findByIdAndUpdate(venueId, updatedVenue, { new: true })
//     .then(() => { res.redirect(`/venues/${venueId}`).catch((error) => {
//         console.log(error)
//     });
//     });
// });


// //delete route
// router.get('/:venueId/delete', (req,res) => {
//     const venueId = req.params.venueId;
//     VenueModel.findByIdAndRemove(venueId)
//         .then(() =>{ res.redirect('/venues')}).catch((error) => {
//             console.log(error)
//         });
// }); 

module.exports = router;


