const express = require("express");
const router = express.Router();
const passport = require("passport");
require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_KEY);

const User = require("../user/UserModel");

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
router.get("/paid", (req, res) => {
  res.render("success", {});
});

/*
    @route  POST pay/monthly
    @desc   Allows user to subscribe to a monthly plan
    @access Private source: 'tok_visa', email = req.body | Private source: token, email = req.user
*/
router.post(
  "/monthly",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { email } = req.body;
    const token = req.body.id;

    User.findOne({ email })
      .then(user => {
        if (user.membership) res.status(400).json("You're already a member!");
        else {
          stripe.customers.create(
            {
              email: email,
              source: token
            },
            (err, customer) => {
              if (err) res.status(400).json("Unable to create a user");
              else {
                const { id } = customer;
                stripe.subscriptions.create(
                  {
                    customer: id,
                    items: [
                      {
                        plan: "Monthly"
                      }
                    ]
                  },
                  (err, subscription) => {
                    if (err) res.status(400).json("Unable to subscribe");
                    else {
                      user.subscription = subscription.id;
                      user.membership = true;
                      user.save();
                      res.redirect("paid");
                    }
                  }
                );
              }
            }
          );
        }
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
);

/* 
    @route  POST pay/yearly
    @desc   Allow user to subscribe to a yearly plan
    @access Private source: 'tok_visa', email = req.body | Private source: token, email = req.user
*/
router.post(
  "/yearly",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { email } = req.body;
    const token = req.body.id;

    User.findOne({ email })
      .then(user => {
        if (user.membership) res.status(400).json("You're already a member!");
        else {
          stripe.customers.create(
            {
              email: email,
              source: token
            },
            (err, customer) => {
              if (err) res.status(400).json("Unable to become a customer");
              else {
                const { id } = customer;
                stripe.subscriptions.create(
                  {
                    customer: id,
                    items: [
                      {
                        plan: "Yearly"
                      }
                    ]
                  },
                  (err, subscription) => {
                    if (err) res.status(400).json("Unable to subscribe");
                    else {
                      user.subscription = subscription.id;
                      user.membership = true;
                      user.save();
                      res.redirect("paid");
                    }
                  }
                );
              }
            }
          );
        }
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
);

/*
    @route  POST pay/unsubscribe
    @desc   Allows the user to unsubscribe
    @access Private
*/
router.post(
  "/unsubscribe",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { email } = req.user;

    User.findOne({ email })
      .then(user => {
        if (user.membership && user.subscription) {
          stripe.subscriptions.del(user.subscription, (err, confirmation) => {
            if (err) res.status(400).json("Unable to unsubscribe at this time");
            else {
              user.subscription = null;
              user.membership = false;
              user.save();
              res
                .status(201)
                .json(
                  "Thank you for your business. We hope to work with you again."
                );
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