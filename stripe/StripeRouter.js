const express = require("express");
const router = express.Router();

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

module.exports = router;
