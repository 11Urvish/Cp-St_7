const areaModel = require("../models/areaModel")
const { propogateError } = require("../utils/helper")

const getAllArea = async () => {
    try {
        return { data: await areaModel.find({}, { updatedAt: 0, createdAt: 0, __v: 0 }), message: "Area details" }
    } catch (error) {
        propogateError(error.message || "Error in finding area details!")
    }
}

const createNewArea = async (areaData) => {
    try {
        const area = new areaModel(areaData)
        const result = await area.save()
        return { data: result, message: "Area created successfully" }
    } catch (error) {
        propogateError(error.message || "Error in creating new area!")
    }
}

const updateArea = async (areaData) => {
    try {
        const area = await areaModel.findById(areaData.areaId)

        if (!area) {
            return { data: null, message: "Area Does Not Exist" }
        }

        area.name = areaData.name || area.name;
        area.code = areaData.code || area.code;
        area.cityCode = areaData.cityCode || area.cityCode;
        area.stateCode = areaData.stateCode || area.stateCode;
        area.countryCode = areaData.countryCode || area.countryCode;
        area.status = areaData.status || area.status;

        return { data: await area.save(), message: "Area details updated" }
    } catch (error) {
        propogateError(error.message || "Error in creating new area!")
    }
}

const deleteArea = async ({ deleteAll, areaId }) => {
    try {

        if (deleteAll) {
            return { data: await areaModel.deleteMany({}), message: "All Areas Deleted!" }
        }

        const area = await areaModel.findById(areaId)

        if (!area) {
            return { data: null, message: "Area Does Not Exist" }
        }

        return { data: await areaModel.deleteOne({ _id: areaId }), message: "Area Deleted" }
    } catch (error) {
        propogateError(error.message || "Error in creating new area!")
    }
}

module.exports.getAllArea = getAllArea
module.exports.createNewArea = createNewArea
module.exports.updateArea = updateArea
module.exports.deleteArea = deleteArea