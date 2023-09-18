const mongoose = require("mongoose");
const { STATION_STATUS_INACTIVE } = require("../utils/constants");

const countrySchema = mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    status: { type: String, default: STATION_STATUS_INACTIVE }
}, {
    timestamps: true
})

const countryModel = mongoose.model("Country", countrySchema)

module.exports = countryModel