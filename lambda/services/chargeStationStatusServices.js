const chargeStationStatusModel = require("../models/chargeStationStatusModel")
const { propogateError } = require("../utils/helper")

const getAllChargeStationStatus = async () => {
    try {
        return { data: await chargeStationStatusModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }), message: "Charger station status details!" }
    } catch (error) {
        propogateError(error.message || "Error in finding charger station status details!")
    }
}

const createNewChargeStationStatus = async (chargeStationStatusData) => {
    try {
        const chargeStationStatus = new chargeStationStatusModel(chargeStationStatusData);

        return { data: await chargeStationStatus.save(), message: "Charge Station Created Successfully." }
    } catch (error) {
        propogateError(error.message || "Error in creating charger station status details!")
    }
}

const updateChargeStationStatus = async (chargeStationStatusData) => {
    try {
        const chargeStationStatus = await chargeStationStatusModel.findById(chargeStationStatusData.chargeStationStatusId);

        if (!chargeStationStatus) {
            propogateError("Charger Station Status does not exist")
        }

        chargeStationStatus.name = chargeStationStatusData.name || chargeStationStatus.name;
        chargeStationStatus.code = chargeStationStatusData.code || chargeStationStatus.code;
        chargeStationStatus.status = chargeStationStatusData.status || chargeStationStatus.status;

        return { data: await chargeStationStatus.save(), message: "Record updated successfully." }
    } catch (error) {
        propogateError(error.message || "Error in updating charger station status details!")
    }
}

const deleteChargeStationStatus = async ({ deleteAll, chargeStationStatusId }) => {
    try {
        if (deleteAll) {
            return { data: await chargeStationStatusModel.deleteMany({}), message: "All Record Deleted Successfully." }
        }

        const chargeStationStatus = await chargeStationStatusModel.findById(chargeStationStatusId)

        if (!chargeStationStatus) {
            propogateError("Charger Station Status does not exist")
        }

        return { data: await chargeStationStatusModel.deleteOne({ _id: chargeStationStatusId }), message: "Record Deleted Successfully." }
    } catch (error) {
        propogateError(error.message || "Error in deleting charger station status details!")
    }
}

module.exports.getAllChargeStationStatus = getAllChargeStationStatus
module.exports.createNewChargeStationStatus = createNewChargeStationStatus
module.exports.updateChargeStationStatus = updateChargeStationStatus
module.exports.deleteChargeStationStatus = deleteChargeStationStatus