const mongoose = require("mongoose");
const { STATION_STATUS_INACTIVE } = require("../utils/constants");

const tariffSchema = mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, default: STATION_STATUS_INACTIVE }
}, {
    timestamps: true
})

const tariffModel = mongoose.model("Tariff", tariffSchema)

module.exports = tariffModel