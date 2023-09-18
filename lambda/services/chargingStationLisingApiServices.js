const chargingStationLisingApiModel = require("../models/chargingStationLisingApiModel")

const getAllChargingStationAccessType = async () => {
    return { data: await chargingStationLisingApiModel.find(), message: "ChargingStationLising details" }
}


const createChargingStationAccessType = async (StationLisingData) => {
    const stationLising = new chargingStationLisingApiModel(StationLisingData)
    const result = await stationLising.save()
    return { data: result, message: "ChargingStationLising created successfully" }
}

const updateChargingStationAccessType = async (StationLisingData) => {
    const stationLising = await chargingStationLisingApiModel.findById(StationLisingData.stationLisingId)

    if (!stationLising) {
        return { data: null, message: "ChargingStationLising Does Not Exist" }
    }

    stationLising.name = StationLisingData.name;
    stationLising.station = StationLisingData.station; stationLising.lising = StationLisingData.lising;

    return { data: await stationLising.save(), message: "ChargingStationLising details updated" }
}

const deleteChargingStationAccessType = async (stationLisingId) => {

    const stationLising = await chargingStationLisingApiModel.findById(stationLisingId)

    if (!stationLising) {
        return { data: null, message: "ChargingStationLising Does Not Exist" }
    }

    return { data: await chargingStationLisingApiModel.deleteOne({ _id: stationLisingId }), message: "ChargingStationLising Deleted" }
}

module.exports.getAllChargingStationAccessType = getAllChargingStationAccessType
module.exports.createChargingStationAccessType = createChargingStationAccessType
module.exports.updateChargingStationAccessType = updateChargingStationAccessType
module.exports.deleteChargingStationAccessType = deleteChargingStationAccessType