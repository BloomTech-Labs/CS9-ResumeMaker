const express = require("express");
const router = express.Router();
const passport = require("passport");

const secretKey = require("../config/keys").secret_key;
const stripe = require("stripe")(secretKey);

const Resume = require("../resume/ResumeModel");
const User = require("../user/UserModel");
const {
  checkMembership,
  createCustomer,
  createSubscription,
  changeStatus
} = require("../helpers/Stripe");

/*
    @route  POST pay/monthly
    @desc   Allows user to subscribe to a monthly plan
    @access Private | Public (Test)
*/
router.post(
  "/monthly",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { email } = req.body;
    const token = req.body.id;

    if (await checkMembership(email)) {
      res.status(400).json("You're already a member!");
    } else {
      const newCustomer = await createCustomer(email, token);
      if (!newCustomer) res.status(400).json("Unable to create a user");
      else {
        const newSubscription = await createSubscription(
          newCustomer.id,
          "Monthly"
        );
        if (!newSubscription) res.status(400).json("Unable to subscribe");
        else {
          if (
            await changeStatus(email, {
              subscription: newSubscription.id,
              membership: true
            })
          ) {
            const query = Resume.find({ user: req.user._id });
            query.then(resumes => {
              res.status(201).json({ resumes });
            }).catch(err => {
              res.status(201).json("Success")
            })
          } else res.status(400).json("Error");
        }
      }
    }
  }
);

/* 
    @route  POST pay/yearly
    @desc   Allow user to subscribe to a yearly plan
    @access Private | Public (Test)
*/
router.post(
  "/yearly",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { email } = req.body;
    const token = req.body.id;

    if (await checkMembership(email))
      res.status(400).json("You're already a member!");
    else {
      const newCustomer = await createCustomer(email, token);
      if (!newCustomer) res.status(400).json("Unable to become a customer");
      else {
        const newSubscription = await createSubscription(
          newCustomer.id,
          "Yearly"
        );
        if (!newSubscription) res.status(400).json("Unable to subscribe");
        else {
          if (
            await changeStatus(email, {
              subscription: newSubscription.id,
              membership: true
            })
          ){
            const query = Resume.find({ user: req.user._id });
            query.then(resumes => {
              res.status(201).json({ resumes });
            }).catch(err => {
              res.status(201).json("Success")
            })          
          } else res.status(400).json("Error");
        }
      }
    }
  }
);

/*
    @route  POST pay/unsubscribe
    @desc   Allows the user to unsubscribe
    @access Private | Public (Test)
*/
router.post(
  "/unsubscribe",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { email } = req.body;
    User.findOne({ email })
      .then(user => {
        if (user.membership && user.subscription) {
          stripe.subscriptions.del(user.subscription, (err, confirmation) => {
            if (err) {
              res.status(400).json("Unable to unsubscribe at this time");
            } else {
              if (
                changeStatus(email, { subscription: null, membership: false })
              )
                res.status(201).json("Successfully Unsubscribed");
              else res.status(400).json(err);
            }
          });
        } else {
          res.status(400).json("You're not a member");
        }
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
);
module.exports = router;
