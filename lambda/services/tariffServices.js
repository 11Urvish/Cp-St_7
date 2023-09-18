const tariffModel = require("../models/tariffModel")
const { propogateError } = require("../utils/helper")

const getAllTariff = async () => {
    try {
        return { data: await tariffModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }), message: "Tariff details!" }
    } catch (error) {
        propogateError(error.message || "Error in finding tariff details!")
    }
}


const createNewTariff = async (tariffData) => {
    try {
        const tariff = new tariffModel(tariffData)
        const result = await tariff.save()
        return { data: result, message: "Tariff created successfully!" }
    } catch (error) {
        propogateError(error.message || "Error in creating tariff details!")
    }
}

const updateTariff = async (TariffData) => {
    try {
        const tariff = await tariffModel.findById(TariffData.tariffId)

        if (!tariff) {
            propogateError("Tariff Does Not Exist")
        }

        tariff.name = TariffData.name || tariff.name;
        tariff.status = TariffData.status || tariff.status;

        return { data: await tariff.save(), message: "Tariff details updated!" }

    } catch (error) {
        propogateError(error.message || "Error in updating tariff details!")
    }
}

const deleteTariff = async ({ deleteAll, tariffId }) => {
    try {
        if (deleteAll) {
            return { data: await tariffModel.deleteMany({}), message: "All tariffs deleted!" }
        }

        const tariff = await tariffModel.findById(tariffId)

        if (!tariff) {
            propogateError("Tariff Does Not Exist")
        }

        return { data: await tariffModel.deleteOne({ _id: tariffId }), message: "Tariff deleted!" }

    } catch (error) {
        propogateError(error.message || "Error in deleting tariff details!")
    }
}

module.exports.getAllTariff = getAllTariff
module.exports.createNewTariff = createNewTariff
module.exports.updateTariff = updateTariff
module.exports.deleteTariff = deleteTariff