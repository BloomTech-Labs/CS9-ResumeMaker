const secretKey = require("../config/keys").secret_key;
const stripe = require("stripe")(secretKey);

const User = require("../user/UserModel");

const checkMembership = async email => {
  const status = await User.findOne({ email });
  return await status.membership;
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
  const updatedStatus = User.findOneAndUpdate({ email }, newInfo);
  return await updatedStatus;
};

module.exports = {
  checkMembership,
  createCustomer,
  createSubscription,
  changeStatus
};
