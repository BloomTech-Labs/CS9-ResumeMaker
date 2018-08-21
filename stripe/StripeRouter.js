const express = require("express");
const router = express.Router();
const passport = require('passport');

const User = require('../user/UserModel');

/*
    @route  GET pay
    @desc   Renders initial page
    @access Public (Testing) | Private (Production)
*/
router.get("/", (req, res) => {
  res.render("index", {});
});

/*
    @route  GET pay/paid
    @desc   Displays successful subscription page
    @access Public (Testing) | Private (Production)
*/
router.get('/paid', (req, res) => {
    res.render('success', {});
})

/*
    @route  POST pay/monthly
    @desc   Allows user to subscribe to a monthly plan
    @access Private (Production)
*/
router.post('/monthly', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { email } = req.user;
})

module.exports = router;
