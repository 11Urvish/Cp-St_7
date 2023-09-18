const mongoose = require("mongoose");

const chargingStationAccessTypeSchema = mongoose.Schema({
    name: { type: String, required: true },
    station: { type: String, required: true },
    access: { type: String, required: true },
    status: { type: String }
}, {
    timestamps: true
})

const chargingStationAccessTypeModel = mongoose.model("ChargingStationAccessType", chargingStationAccessTypeSchema)

module.exports = chargingStationAccessTypeModel


