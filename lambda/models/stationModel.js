const mongoose = require("mongoose");
const { STATION_STATUS_INACTIVE } = require("../utils/constants");

const addressSchema = mongoose.Schema({
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true }
})

const infoSchema = mongoose.Schema({
    name: { type: String, required: true },
    accessType: { type: String, required: true },
    desc: { type: String, required: true },
    address: { type: addressSchema, required: true },
    stationStatus: { type: String, required: true },
    energyLimit: { type: String, required: true }
})

const timingSchema = mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true }
})

const ownerSchema = mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: addressSchema, required: true }
})

const stationSchema = mongoose.Schema({
    tenantId: { type: String, required: true },
    info: { type: infoSchema, required: true },
    timings: { type: timingSchema, required: true },
    owner: { type: ownerSchema, required: true },
    chargers: { type: [mongoose.Schema.Types.ObjectId], ref: "Charger", default: [] },
    status: { type: String, default: STATION_STATUS_INACTIVE }
}, {
    timestamps: true
})

const stationModel = mongoose.model("Station", stationSchema)

module.exports = stationModel