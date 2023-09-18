const mongoose = require('mongoose');
const { STATION_STATUS_INACTIVE } = require('../utils/constants');

const preAuthSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Custoemr", required: true },
    booking_id: { type: mongoose.Schema.Types.ObjectId, ref: "ChargerBooking", required: true },
    payment_intent_id: { type: String, required: true },
    client_secret: { type: String, required: true },
    status: { type: String, default: STATION_STATUS_INACTIVE }
}, {
    timestamps: true
});

const PreAuthModel = mongoose.model('PreAuth', preAuthSchema);

module.exports = PreAuthModel;