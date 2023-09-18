const mongoose = require("mongoose");

const chargingStationLisingAPISchema = mongoose.Schema({
    name: { type: String, required: true },
    station: { type: String, required: true },
    lising: { type: String, required: true }
}, {
    timestamps: true
})

const chargingStationLisingAPIModel = mongoose.model("ChargingStationLisingAPI", chargingStationLisingAPISchema)

module.exports = chargingStationLisingAPIModel


