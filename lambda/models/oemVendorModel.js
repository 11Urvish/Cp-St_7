const mongoose = require('mongoose');
const { STATION_STATUS_INACTIVE } = require('../utils/constants');

const oemVendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, default: STATION_STATUS_INACTIVE }
}, {
    timestamps: true
});

const oemVendorModel = mongoose.model('OemVendor', oemVendorSchema);

module.exports = oemVendorModel