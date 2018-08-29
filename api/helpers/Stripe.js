const secretKey = require("../config/keys").secret_key;
const stripe = require("stripe")(secretKey);

const User = require("../user/UserModel");

const checkMembership = email => {
  User.findOne({ email })
    .then(async user => {
      return await user.membership;
    })
    .catch(async err => {
      return await err;
    });
};

const createCustomer = async (email, token) => {
  const customer = stripe.customers.create({
    email: email,
    source: token
  });
  return await customer;
};

const createSubscription = async (id, planType) => {
  const subscription = stripe.subscriptions.create({
    customer: id,
    items: [
      {
        plan: planType
      }
    ]
  });
  return await subscription;
};

const changeStatus = async (email, newInfo) => {
  const updatedStatus = await User.findOneAndUpdate({ email }, newInfo);
  return updatedStatus;
};

module.exports = {
  checkMembership,
  createCustomer,
  createSubscription,
  changeStatus
};
