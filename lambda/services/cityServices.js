const cityModel = require("../models/cityModel")
const { propogateError } = require("../utils/helper")

const getAllCity = async () => {
    try {
        return { data: await cityModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }), message: "City details!" }
    } catch (error) {
        propogateError(error.message || "Error in finding city details!")
    }
}

const createNewCity = async (cityData) => {
    try {
        const city = new cityModel(cityData)
        const result = await city.save()
        return { data: result, message: "City created successfully" }
    } catch (error) {
        propogateError(error.message || "Error in creating city!")
    }
}

const updateCity = async (cityData) => {
    try {
        const city = await cityModel.findById(cityData.cityId)

        if (!city) {
            propogateError("City Does Not Exist")
        }

        city.name = cityData.name || city.name;
        city.code = cityData.code || city.code;
        city.stateCode = cityData.stateCode || city.stateCode;
        city.countryCode = cityData.countryCode || city.countryCode;
        city.status = cityData.status || city.status;

        return { data: await city.save(), message: "City details updated" }
    } catch (error) {
        propogateError(error.message || "Error in updating city!")
    }
}

const deleteCity = async ({ deleteAll, cityId }) => {
    try {
        if (deleteAll) {
            return { data: await cityModel.deleteMany({}), message: "All cities deleted!" }
        }

        const city = await cityModel.findById(cityId)

        if (!city) {
            propogateError("City does not exist!")
        }

        return { data: await cityModel.deleteOne({ _id: cityId }), message: "City deleted!" }
    } catch (error) {
        propogateError(error.message || "Error in creating city!")
    }
}

module.exports.getAllCity = getAllCity
module.exports.createNewCity = createNewCity
module.exports.updateCity = updateCity
module.exports.deleteCity = deleteCity