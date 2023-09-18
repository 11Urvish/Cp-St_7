const mongoose = require('mongoose');
const { STATION_STATUS_INACTIVE } = require('../utils/constants');

const connectorSchema = new mongoose.Schema({
    name: String,
    connector_id: Number,
    status: String,
    oem_ref: String,
    tarrif: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tarrif',
    },
});

const ChargerSchema = new mongoose.Schema({
    is_active: Boolean,
    parking_restrictions: Boolean,
    name: String,
    description: String,
    charger_id: String,
    oem: { type: mongoose.Schema.Types.ObjectId, ref: 'Oem', },
    connectors: [connectorSchema],
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', },
    charging_station: { type: mongoose.Schema.Types.ObjectId, ref: 'ChargingStation', },
    access_type: String,
    timing_type: String,
    per_unit_rates: String,
    comments: String,
    cooldown_time: String,
    charging_speed: String,
    energy_limits: String,
    settings: { current_firmware: String, },
    createdAt: Date,
    updatedAt: Date,
    is_enabled: Boolean,
    otp_verification: Boolean,
    charger_status: String,
    status: { type: String, default: STATION_STATUS_INACTIVE }
}, {
    timestamps: true
});

const Charger = mongoose.model('Charger', ChargerSchema);

module.exports = Charger;