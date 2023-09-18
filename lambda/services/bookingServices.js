const PaymentMethodModel = require("../models/paymentMethodModel");
const CustomerModel = require("../models/customerModel");
const PreAuthModel = require("../models/preAuthModel");
const { STRIPE_KEY } = require("../utils/constants");

const createBooking = async (params) => {
  try {
    const stripe = require("stripe")(STRIPE_KEY);
    const { id, amount, currency } = params;

    console.log("id", id);

    let customer = await CustomerModel.findById(id);
    console.log("customer", customer);

    if (!customer) {
      return { data: null, message: "Customer not found" };
    }

    if (!customer.payMethodIds) {
      return { data: null, message: "Customer does not have any payment method" };
    }

    const paymentMethod = await PaymentMethodModel.findById(customer.payMethodIds);
    if (!paymentMethod) {
      return { data: null, message: "Payment Method not found" };
    }

    console.log("paymentMethod", paymentMethod);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      confirmation_method: "manual",
      customer: customer.custStripeId,
      setup_future_usage: "off_session",
    });

    if (!paymentIntent) {
      return { data: null, message: "payment Intent not found" };
    }

    console.log("paymentIntent", paymentIntent);

    const preAuthModel = new PreAuthModel({
      customer_id: customer._id,
      booking_id: "6449165dadb3f357acf6902c",
      payment_intent_id: paymentIntent.id,
      client_secret: paymentIntent.client_secret,
    });

    const preAuth = await preAuthModel.save();

    console.log("preAuth", preAuth);

    return { data: {}, message: "Booking created successfully" };
  } catch (error) {
    throw new Error(error.message || "Error in creatingb Payment Method!");
  }
};

module.exports.createBooking = createBooking;
