const mongoose = require('mongoose');
const { STATION_STATUS_INACTIVE } = require('../utils/constants');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    country: String,
    state: String,
    city: String,
    area: String,
    pincode: Number,
    details: String,
});

const tenantSchema = new Schema({
    mode: String,
    licenses: [String],
    charging_stations: Number,
    chargers: Number,
    name: String,
    license_expiry: Date,
    address: [addressSchema],
    contact_person: { type: Schema.Types.ObjectId, ref: 'User' },
    is_active: Boolean,
    allow_remote_access: Boolean,
    max_user: Number,
    status: { type: String, default: STATION_STATUS_INACTIVE }
}, {
    timestamps: true
});

const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;