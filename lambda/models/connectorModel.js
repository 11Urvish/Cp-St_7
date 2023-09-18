const mongoose = require("mongoose");
const { STATION_STATUS_INACTIVE } = require("../utils/constants");

const connectorSchema = mongoose.Schema({
    id: { type: String, required: true },
    chargerId: { type: mongoose.Schema.Types.ObjectId, ref: "Charger", required: true },
    type: { type: String, required: true },
    tariff: { type: String, required: true },
    maxPower: { type: String, required: true },
    current: { type: String, required: true },
    phases: { type: String, required: true },
    status: { type: String, default: STATION_STATUS_INACTIVE }
}, {
    timestamps: true
})

const connectorModel = mongoose.model("Connector", connectorSchema)

module.exports = connectorModel