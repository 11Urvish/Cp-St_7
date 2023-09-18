const countryModel = require("../models/countryModel")
const { propogateError } = require("../utils/helper")

const getAllCountry = async () => {
    try {
        return { data: await countryModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }), message: "Country details" }
    } catch (error) {
        propogateError(error.message || "Error in finding country details!")
    }
}

const createNewCountry = async (countryData) => {
    try {
        const country = new countryModel(countryData)

        return { data: await country.save(), message: "Country created successfully" }
    } catch (error) {
        propogateError(error.message || "Error in finding country details!")
    }
}

const updateCountry = async (countryData) => {
    try {
        const country = await countryModel.findById(countryData.countryId)

        if (!country) {
            propogateError("Country Does Not Exist")
        }

        country.name = countryData.name || country.name;
        country.code = countryData.code || country.code;
        country.status = countryData.status || country.status;

        return { data: await country.save(), message: "Country details updated" }
    } catch (error) {
        propogateError(error.message || "Error in finding country details!")
    }
}

const deleteCountry = async ({ deleteAll, countryId }) => {
    try {
        if (deleteAll) {
            return { data: await countryModel.deleteMany({}), message: "All Country Deleted" }
        }

        const country = await countryModel.findById(countryId)

        if (!country) {
            propogateError("Country Does Not Exist")
        }

        return { data: await countryModel.deleteOne({ _id: countryId }), message: "Country Deleted" }
    } catch (error) {
        propogateError(error.message || "Error in finding country details!")
    }
}

module.exports.getAllCountry = getAllCountry
module.exports.createNewCountry = createNewCountry
module.exports.updateCountry = updateCountry
module.exports.deleteCountry = deleteCountry