const chargeSpotModel = require("../models/chargeSpotModel")
const { propogateError } = require("../utils/helper")

const getAllChargeSpot = async () => {
    try {
        return { data: await chargeSpotModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }), message: "ChargeSpot details!" }
    } catch (error) {
        propogateError(error.message || "Error in finding Charge Spot!")
    }
}

const createNewChargeSpot = async (ChargeSpotData) => {
    try {
        const ChargeSpot = new chargeSpotModel(ChargeSpotData)
        const result = await ChargeSpot.save()
        return { data: result, message: "ChargeSpot created successfully!" }
    } catch (error) {
        propogateError(error.message || "Error in creating Charge Spot!")
    }
}

const updateChargeSpot = async (ChargeSpotData) => {
    try {
        const chargeSpot = await chargeSpotModel.findById(ChargeSpotData.chargeSpotId)

        if (!chargeSpot) {
            return { data: null, message: "ChargeSpot Does Not Exist" }
        }

        chargeSpot.name = ChargeSpotData.name || chargeSpot.name;
        chargeSpot.spot = ChargeSpotData.spot || chargeSpot.spot;
        chargeSpot.status = ChargeSpotData.status || chargeSpot.status;

        return { data: await chargeSpot.save(), message: "ChargeSpot details updated!" }
    } catch (error) {
        propogateError(error.message || "Error in updating Charge Spot!")
    }
}

const deleteChargeSpot = async ({ deleteAll, chargeSpotId }) => {
    try {
        if(deleteAll){
            return { data: await chargeSpotModel.deleteMany({}), message: "ChargeSpot Deleted" }
        }

        const chargeSpot = await chargeSpotModel.findById(chargeSpotId)

        if (!chargeSpot) {
            return { data: null, message: "ChargeSpot Does Not Exist" }
        }

        return { data: await chargeSpotModel.deleteOne({ _id: chargeSpotId }), message: "ChargeSpot Deleted" }
    } catch (error) {
        propogateError(error.message || "Error in deleting Charge Spot!")
    }
}

module.exports.getAllChargeSpot = getAllChargeSpot
module.exports.createNewChargeSpot = createNewChargeSpot
module.exports.updateChargeSpot = updateChargeSpot
module.exports.deleteChargeSpot = deleteChargeSpot

