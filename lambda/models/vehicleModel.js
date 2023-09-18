const mongoose = require('mongoose');
const { STATION_STATUS_INACTIVE } = require('../utils/constants');

const vehicleSchema = new mongoose.Schema({
    name: String,
    type: String,
    make: String,
    model: String,
    rto_no: String,
    insurance_expiry: Date,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    max_charging_capacity: String,
    status: { type: String, default: STATION_STATUS_INACTIVE },
}, {
    timestamps: true
});

module.exports = mongoose.model('Vehicle', vehicleSchema);