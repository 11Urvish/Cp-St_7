const mongoose = require("mongoose");
const { STATION_STATUS_INACTIVE } = require("../utils/constants");

const transactionSchema = mongoose.Schema({
    amount: { type: Number, required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    paymentMethodId: { type: mongoose.Schema.Types.ObjectId, ref : "PaymentMethod", required: true },
    stripeTransactionId: { type: String, required: true },
    status: { type: String, default: STATION_STATUS_INACTIVE }
}, {
    timestamps: true
})

const transactionModel = mongoose.model("Transaction", transactionSchema)

module.exports = transactionModel