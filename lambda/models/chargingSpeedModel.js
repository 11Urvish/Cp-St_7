const mongoose = require("mongoose");
const { STATION_STATUS_INACTIVE } = require("../utils/constants");

const chargingSpeedSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, default: STATION_STATUS_INACTIVE }
}, {
    timestamps: true
})

const chargingSpeedModel = mongoose.model("ChargingSpeed", chargingSpeedSchema)

module.exports = chargingSpeedModel