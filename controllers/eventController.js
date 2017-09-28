const express = require('express');
const router = express.Router();
const Schema = require('../db/schema.js');
const VenueModel = Schema.VenueModel;
const EventModel = Schema.EventModel;

router.get('/events', (req,res) => {
    EventModel.find({})
        .then((event) => {
            res.render('events/event', {
                event
            }).catch((error) => {
                //console.log(error)
            })
        });
});