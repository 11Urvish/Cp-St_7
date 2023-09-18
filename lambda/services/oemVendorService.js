const oemVendorModel = require("../models/oemVendorModel")
const { propogateError } = require("../utils/helper")

const getAllOemVendors = async () => {
    try {
        return { data: await oemVendorModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }), message: "OEM Vendors details!" }
    } catch (error) {
        propogateError(error.message || "Error in finding oem vendor details")
    }
}

const createOemVendor = async (OemVendorData) => {
    try {
        const oemVendor = new oemVendorModel(OemVendorData)

        return { data: await oemVendor.save(), message: "OEM Vendors created!" }
    } catch (error) {
        propogateError(error.message || "Error in creating oem vendor details")
    }
}

const updateOemVendor = async (oemVendorData) => {
    try {
        const oemVendor = await oemVendorModel.findById(oemVendorData.oemVendorId)

        if (!oemVendor) {
            propogateError("OEM Vendor not found!")
        }

        oemVendor.name = oemVendorData.name || oemVendor.name
        oemVendor.status = oemVendorData.status || oemVendor.status

        return { data: await oemVendor.save(), message: "OEM Vendor updated!" }
    } catch (error) {
        propogateError(error.message || "Error in updating oem vendor details")
    }
}

const deleteOemVendor = async ({ deleteAll, oemVendorId }) => {
    try {
        if (deleteAll) {
            return { data: await oemVendorModel.deleteMany(), message: "All OEM Vendors deleted!" }
        }

        const oemVendor = await oemVendorModel.findById(oemVendorId)
        if (!oemVendor) {
            propogateError("OEM Vendor not found!")
        }

        return { data: await oemVendor.deleteOne({ _id: oemVendorId }), message: "OEM Vendor deleted!" }
    } catch (error) {
        propogateError(error.message || "Error in deleting oem vendor details")
    }
}

module.exports = {
    getAllOemVendors,
    createOemVendor,
    updateOemVendor,
    deleteOemVendor
}