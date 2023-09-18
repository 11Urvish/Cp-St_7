const chargingSpeedModel = require("../models/chargingSpeedModel")
const { propogateError } = require("../utils/helper")

const getAllChargingSpeed = async () => {
    try {
        return { data: await chargingSpeedModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }), message: "Charging Speed details!" }
    } catch (error) {
        propogateError(error.message || "Error in finding charging speed details!")
    }
}

const createNewChargingSpeed = async (chargingSpeedData) => {
    try {
        const chargingSpeed = new chargingSpeedModel(chargingSpeedData)

        return { data: await chargingSpeed.save(), message: "Charging Speed created successfully!" }
    } catch (error) {
        propogateError(error.message || "Error in finding charging speed details!")
    }
}

const updateChargingSpeed = async (chargingSpeedData) => {
    try {
        const chargingSpeed = await chargingSpeedModel.findById(chargingSpeedData.chargingSpeedId)

        if (!chargingSpeed) {
            propogateError("Charging Speed does not exist!")
        }

        chargingSpeed.name = chargingSpeedData.name || chargingSpeed.name;
        chargingSpeed.status = chargingSpeedData.status || chargingSpeed.status;

        return { data: await chargingSpeed.save(), message: "ChargingSpeed details updated!" }
    } catch (error) {
        propogateError(error.message || "Error in finding charging speed details!")
    }
}

const deleteChargingSpeed = async ({ deleteAll, chargingSpeedId }) => {
    try {
        if (deleteAll) {
            return { data: await chargingSpeedModel.deleteMany(), message: "All charging speed deleted!" }
        }
        
        const chargingSpeed = await chargingSpeedModel.findById(chargingSpeedId);

        if (!chargingSpeed) {
            propogateError("Charging Speed does not exist!")
        }

        return { data: await chargingSpeedModel.deleteOne({ _id: chargingSpeedId }), message: "Charging Speed Deleted!" }
    } catch (error) {
        propogateError(error.message || "Error in finding charging speed details!")
    }
}

module.exports.getAllChargingSpeed = getAllChargingSpeed
module.exports.createNewChargingSpeed = createNewChargingSpeed
module.exports.updateChargingSpeed = updateChargingSpeed
module.exports.deleteChargingSpeed = deleteChargingSpeed