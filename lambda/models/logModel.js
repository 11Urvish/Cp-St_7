const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const occpReportsSchema = new Schema({
    tenantId: { type: String, required: true },
    chargerId: { type: String, required: true },
    action: { type: String, required: true },
    messageId: { type: String, required: true },
    origin: { type: String, requried: true },
    request: { type: String, required: true },
    requestTime: { type: String, required: true },
    response: { type: String },
    responseTime: { type: Date },
}, {
    timestamps: true
});

module.exports = mongoose.model("occp_reports", occpReportsSchema);