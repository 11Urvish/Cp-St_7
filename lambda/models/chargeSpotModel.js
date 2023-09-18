const mongoose = require("mongoose");
const { STATION_STATUS_INACTIVE } = require("../utils/constants");

const chargespotNameSchema = mongoose.Schema({
    name: { type: String, required: true },
    spot: { type: String, required: true },
    status: { type: String, default: STATION_STATUS_INACTIVE }
}, {
    timestamps: true
})

const chargespotNameModel = mongoose.model("chargespotName", chargespotNameSchema)

module.exports = chargespotNameModel



