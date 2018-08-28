const express = require("express");
const router = express.Router();
const passport = require("passport");
require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_KEY);

const User = require("../user/UserModel");

const createCustomer = (email, token) => {
  const customer = stripe.customers.create({
    email: email,
    source: token
  });
  return customer;
};

const createSubscription = (id, planType) => {
  const subscription = stripe.subscriptions.create({
    customer: id,
    items: [
      {
        plan: planType
      }
    ]
  });
  return subscription;
};

const paidMember = async (sub_id, email) => {
  const membershipChange = {
    subscription: sub_id,
    membership: true
  };

  const updatedStatus = await User.findOneAndUpdate(
    { email },
    membershipChange
  );
  return updatedStatus;
};
/*
    @route  POST pay/monthly
    @desc   Allows user to subscribe to a monthly plan
    @access Private | Public (Test)
*/
router.post(
  "/monthly",
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { email } = req.body;
    const token = req.body.id;

    User.findOne({ email })
      .then(user => {
        if (user.membership) res.status(400).json("You're already a member!");
        else {
          const newCustomer = createCustomer(email, token);
          if (!newCustomer) res.status(400).json("Unable to create a user");
          else {
            const newSubscription = createSubscription(
              newCustomer.id,
              "Monthly"
            );
            if (!newSubscription) res.status(400).json("Unable to subscribe");
            else {
              if (paidMember(newSubscription.id, email))
                res.status(201).json("Success");
              else res.status(400).json("Error");
            }
          }
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
    @access Private | Public (Test)
*/
router.post(
  "/yearly",
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { email } = req.body;
    const token = req.body.id;

    User.findOne({ email })
      .then(user => {
        if (user.membership) res.status(400).json("You're already a member!");
        else {
          const newCustomer = createCustomer(email, token);
          if (!newCustomer) res.status(400).json("Unable to become a customer");
          else {
            const newSubscription = createSubscription(
              newCustomer.id,
              "Yearly"
            );
            if (!newSubscription) res.status(400).json("Unable to subscribe");
            else {
              if (paidMember(newSubscription.id, email))
                res.status(201).json("Success");
              else res.status(400).json("Error");
            }
          }
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
    @access Private | Public (Test)
*/
router.post(
  "/unsubscribe",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { email } = req.body;
    User.findOne({ email })
      .then(user => {
        if (user.membership && user.subscription) {
          stripe.subscriptions.del(user.subscription, (err, confirmation) => {
            if (err) {
              res.status(400).json("Unable to unsubscribe at this time");
            } else {
              const membershipChange = {
                subscription: null,
                membership: false
              };
              User.findOneAndUpdate({ email }, membershipChange)
                .then(user => {
                  res.status(201).json("Successfully Unsubscribed");
                })
                .catch(err => {
                  res.status(400).json(err);
                });
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
