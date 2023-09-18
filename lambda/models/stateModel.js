const mongoose = require("mongoose");
const { STATION_STATUS_INACTIVE } = require("../utils/constants");

const stateSchema = mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    countryCode: { type: String, required: true },
    status: { type: String, default: STATION_STATUS_INACTIVE }
}, {
    timestamps: true
})

const stateModel = mongoose.model("State", stateSchema)

module.exports = stateModel