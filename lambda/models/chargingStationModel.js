const mongoose = require("mongoose");
const { STATION_STATUS_INACTIVE } = require("../utils/constants");

const chargingStationSchema = mongoose.Schema({
    photos: { type: String, },
    avg_rating: { type: Number, },
    rating_count: { type: Number, },
    total_chargers: { type: Number, },
    energy_consumed: { type: Number, },
    chargers_in_use: { type: Number, },
    average_charging_time: { type: Number, },
    availableToUsers: [mongoose.Schema.Types.ObjectId],
    tags: { type: String, },
    is_active: { type: Boolean, },
    name: { type: String, required: true },
    access_type: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    countryCode: { type: String, required: true },
    timing_type: { type: String, required: true },
    description: { type: String, required: true },
    contact_person: {
        type: mongoose.Schema.Types.ObjectId, required: true,
        ref: 'User'
    },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    pinCode: { type: Number, required: true },
    show_on_mobile_app: { type: Boolean, required: true },
    status: { type: String, default: STATION_STATUS_INACTIVE },
    tenant: {
        type: mongoose.Schema.Types.ObjectId, required: true,
        ref: 'Tenant'
    },

}, {
    timestamps: true
})

const chargingStationModel = mongoose.model("ChargingStation", chargingStationSchema)

module.exports = chargingStationModel

