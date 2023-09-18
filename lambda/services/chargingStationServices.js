const chargingStationModel = require("../models/chargingStationModel")
const { propogateError } = require("../utils/helper")

const getAllChargingStation = async () => {
    try {
        return { data: await chargingStationModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }), message: "ChargingStation details" }
    } catch (error) {
        propogateError(error.message || "Error in finding chargingStation details!")
    }
}

const createNewChargingStation = async (chargingStationData) => {
    try {
        const chargingStation = new chargingStationModel(chargingStationData)

        return { data: await chargingStation.save(), message: "ChargingStation created successfully" }
    } catch (error) {
        propogateError(error.message || "Error in finding chargingStation details!")
    }
}

const updateChargingStation = async (chargingStationData) => {
    try {
        const chargingStation = await chargingStationModel.findById(chargingStationData.chargingStationId)

        if (!chargingStation) {
            propogateError("ChargingStation Does Not Exist")
        }

        chargingStation.name = chargingStationData.name || chargingStation.name;
        chargingStation.access_type = chargingStationData.access_type || chargingStation.access_type;
        chargingStation.address = chargingStationData.address || chargingStation.address;
        chargingStation.location = chargingStationData.location || chargingStation.location;
        chargingStation.countryCode = chargingStationData.countryCode || chargingStation.countryCode;
        chargingStation.timing_type = chargingStationData.timing_type || chargingStation.timing_type;
        chargingStation.description = chargingStationData.description || chargingStation.description;
        chargingStation.contact_person = chargingStationData.contact_person || chargingStation.contact_person;
        chargingStation.country = chargingStationData.country || chargingStation.country;
        chargingStation.state = chargingStationData.state || chargingStation.state;
        chargingStation.city = chargingStationData.city || chargingStation.city;
        chargingStation.area = chargingStationData.area || chargingStation.area;
        chargingStation.pinCode = chargingStationData.pinCode || chargingStation.pinCode;
        chargingStation.show_on_mobile_app = chargingStationData.show_on_mobile_app || chargingStation.show_on_mobile_app;
        chargingStation.tenant = chargingStationData.tenant || chargingStation.tenant;


        return { data: await chargingStation.save(), message: "ChargingStation details updated" }
    } catch (error) {
        propogateError(error.message || "Error in finding chargingStation details!")
    }
}

const deleteChargingStation = async ({ deleteAll, chargingStationId }) => {
    try {
        if (deleteAll) {
            return { data: await chargingStationModel.deleteMany({}), message: "All ChargingStation Deleted" }
        }

        const chargingStation = await chargingStationModel.findById(chargingStationId)

        if (!chargingStation) {
            propogateError("ChargingStation Does Not Exist")
        }

        return { data: await chargingStationModel.deleteOne({ _id: chargingStationId }), message: "ChargingStation Deleted" }
    } catch (error) {
        propogateError(error.message || "Error in finding chargingStation details!")
    }
}

module.exports.getAllChargingStation = getAllChargingStation
module.exports.createNewChargingStation = createNewChargingStation
module.exports.updateChargingStation = updateChargingStation
module.exports.deleteChargingStation = deleteChargingStation