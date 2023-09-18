const mongoose = require("mongoose");
const { STATION_STATUS_INACTIVE } = require("../utils/constants");

const areaSchema = mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    cityCode: { type: String, required: true },
    stateCode: { type: String, required: true },
    countryCode: { type: String, required: true },
    status : {type : String, default : STATION_STATUS_INACTIVE}
}, {
    timestamps: true
})

const areaModel = mongoose.model("Area", areaSchema)

module.exports = areaModel