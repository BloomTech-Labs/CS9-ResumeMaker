const express = require('express');
const router = express.Router();
const passport = require("passport");

/*
    @route  resume
    @desc   Creates a new resume per user
    @access Private (Production) | Public (Development)
*/
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    
})

module.exports = router;