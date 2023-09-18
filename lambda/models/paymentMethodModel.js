const mongoose = require("mongoose");
const { STATION_STATUS_INACTIVE } = require("../utils/constants");

const paymentMethodSchema = mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    lastFourDigits: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cardType: { type: String, required: true },
    token: { type: String, required: true },
    status: { type: String, default: STATION_STATUS_INACTIVE },
}, {
    timestamps: true
})

const paymentMethodModel = mongoose.model("PaymentMethod", paymentMethodSchema)

module.exports = paymentMethodModel