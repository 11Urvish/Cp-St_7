const mongoose = require("mongoose");
const { STATION_STATUS_INACTIVE } = require("../utils/constants");

const connectorSchema = new mongoose.Schema({
    type: String,
    connector_type: { type: mongoose.Schema.Types.ObjectId, ref: 'ConnectorType' },
    charge_speed: { type: mongoose.Schema.Types.ObjectId, ref: 'ChargingSpeed' },
    // connector_type: { type: String, ref: 'ConnectorType' },
    // charge_speed: { type: String, ref: 'ChargingSpeed' },
    name: String,
    code: String,
    current: String,
    rating: String,
    number: String,
    format: String,
    power_type: String,
    max_voltage: String,
    connector_status: String
});

const oemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // vendor: { type: String, ref: 'OemVendor' },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'OemVendor' },
    input_voltage: String,
    power_factor: String,
    efficiency: String,
    input_frequency: String,
    wires: String,
    ambient_temperature: String,
    storage_temperature: String,
    altitude: String,
    humidity: String,
    display: String,
    language: String,
    push_button: String,
    user_authentication: String,
    visual_indication: String,
    protection: String,
    charger_vehicle_communication: String,
    charger_cms_communication: String,
    ingress_protection: String,
    enclosure_protection: String,
    cooling: String,
    wire_length: String,
    dimension_w_h_d: String,
    image: String,
    connectors: [connectorSchema],
    make: String,
    status: { type: String, default: STATION_STATUS_INACTIVE }
}, {
    timestamps: true
});

const oemModel = mongoose.model("OEM", oemSchema)

module.exports = oemModel