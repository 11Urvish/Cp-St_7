const mongoose = require("mongoose");

const connectorTypeSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    connector_mode: { type: String, required: true },
    connector_standard: { type: String, required: true },
    status: { type: String }
}, {
    timestamps: true
})

const connectorTypeModel = mongoose.model("ConnectorType", connectorTypeSchema)

module.exports = connectorTypeModel