const express = require('express');
const router = express.Router();
const Schema = require('../db/schema.js');
const VenueModel = Schema.VenueModel;
const EventModel = Schema.EventModel;
const UserModel = Schema.UserModel;

//shows login page
router.get('/signin', (req,res) => {
    UserModel.find({})
        .then((users) => {
            res.render('users/index',{
                users
            }).catch((error) => {
                console.log('error' + error)
            });
        });
});

module.exports = router;
