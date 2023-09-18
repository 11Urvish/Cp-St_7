const PaymentMethodModel = require("../models/paymentMethodModel");
const CustomerModel = require("../models/customerModel");
const { STRIPE_KEY } = require("../utils/constants");

const getAllPaymentMethod = async () => {
  try {
    return { data: await PaymentMethodModel.find(), message: "PaymentMethod details" };
  } catch (error) {
    throw new Error(error.message || "Error in finding Payment Method!");
  }
};

const createNewPaymentMethod = async (params) => {
  try {
    const stripe = require("stripe")(STRIPE_KEY);
    const { id, email, token } = params;

    let customer = await CustomerModel.findById(id);

    if (!customer) {
      return { data: null, message: "Customer not found" };
    }

    if (!customer.custStripeId) {
      const sCust = await stripe.customers.create({ name: customer.firstName + " " + customer.lastName, email: customer.email, phone: customer.phone });
      const updateModel = { custStripeId: sCust.id };
      customer = await CustomerModel.findByIdAndUpdate(customer._id, updateModel);
    }

    const stripePaymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: { token },
    });
    if (!stripePaymentMethod) {
      return { data: null, message: "Stripe Payment Method not found" };
    }

    const attachedStripePayMethod = await stripe.paymentMethods.attach(stripePaymentMethod.id, { customer: customer.custStripeId });

    if (!attachedStripePayMethod) {
      return { data: null, message: "Pay Method creation failed" };
    }

    const paymentMethodModel = new PaymentMethodModel({
      customerId: customer._id,
      lastFourDigits: stripePaymentMethod.card.last4,
      expiryDate: stripePaymentMethod.card.exp_month + "/" + stripePaymentMethod.card.exp_year,
      cardType: stripePaymentMethod.card.brand,
      token: token,
    });

    const paymentMethod = await paymentMethodModel.save();

    const updateCustPayMethodIdModel = { payMethodIds: paymentMethod._id };
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(customer._id, updateCustPayMethodIdModel);

    console.log("updatedCustomer", updatedCustomer);

    return { data: {}, message: "Pay Method created successfully" };
  } catch (error) {
    throw new Error(error.message || "Error in creatingb Payment Method!");
  }
};

const capturePayment = async (params) => {
  try {
    const stripe = require("stripe")(STRIPE_KEY);
    const { id } = params;

    const preAuthModel = await PreAuthModel.findOne({ customer_id: id, booking_id: "6449165dadb3f357acf6902c" });

    const paymentIntent = await stripe.paymentIntents.capture(preAuthModel.payment_intent_id);

    return { data: paymentIntent, message: "Pay Method created successfully" };
  } catch (error) {
    throw new Error(error.message || "Error in creatingb Payment Method!");
  }
};

module.exports.getAllPaymentMethod = getAllPaymentMethod;
module.exports.createNewPaymentMethod = createNewPaymentMethod;
module.exports.capturePayment = capturePayment;
