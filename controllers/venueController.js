const express = require('express');
const router = express.Router();
const Schema = require('../db/schema.js');
const VenueModel = Schema.VenueModel;
//index
router.get('/venues', (req,res) => {
    VenueModel.find({})
        .then((venues) => {
            res.render('venues/venues', {
                venues
            }).catch((error) => {
                console.log(`error ${error}`)
            })
        });
});

module.exports = router;


