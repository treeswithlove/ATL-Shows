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

module.exports = router;


