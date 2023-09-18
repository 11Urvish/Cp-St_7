const mongoose = require("mongoose");
const { STATION_STATUS_INACTIVE } = require("../utils/constants");

const citySchema = mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    stateCode: { type: String, required: true },
    countryCode: { type: String, required: true },
    status: { type: String, default: STATION_STATUS_INACTIVE }
}, {
    timestamps: true
})

const cityModel = mongoose.model("City", citySchema)

module.exports = cityModel