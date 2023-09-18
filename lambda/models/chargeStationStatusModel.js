const mongoose = require("mongoose");
const { STATION_STATUS_INACTIVE } = require("../utils/constants");

const ChargeStationStatusSchema = mongoose.Schema({
    name: { type: String, required: true },
    station: { type: String, required: true },
    status: { type: String, default: STATION_STATUS_INACTIVE }
}, {
    timestamps: true
})

const ChargeStationStatusModel = mongoose.model("ChargeStationStatus", ChargeStationStatusSchema)

module.exports = ChargeStationStatusModel


