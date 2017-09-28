const express = require('express');
const router = express.Router();
const Schema = require('../db/schema.js');
const VenueModel = Schema.VenueModel;
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


//edit route
router.get('/:id/edit', (req,res) => {
    
});


module.exports = router;


