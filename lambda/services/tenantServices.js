const tenantModel = require("../models/tenantModel")
const { propogateError } = require("../utils/helper")

const getAllTenant = async () => {
    try {
        return { data: await tenantModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }), message: "Tenant details" }
    } catch (error) {
        propogateError(error.message || "Error in finding tenant details!")
    }
}

const createNewTenant = async (tenantData) => {
    try {
        const tenant = new tenantModel(tenantData)

        return { data: await tenant.save(), message: "Tenant created successfully" }
    } catch (error) {
        propogateError(error.message || "Error in finding tenant details!")
    }
}

const updateTenant = async (tenantData) => {
    try {
        const tenant = await tenantModel.findById(tenantData.tenantId)

        if (!tenant) {
            propogateError("Tenant Does Not Exist")
        }

        tenant.mode = tenantData.mode || tenant.mode;
        tenant.licenses = tenantData.licenses || tenant.licenses;
        tenant.charging_stations = tenantData.charging_stations || tenant.charging_stations;
        tenant.chargers = tenantData.chargers || tenant.chargers;
        tenant.name = tenantData.name || tenant.name;
        tenant.license_expiry = tenantData.license_expiry || tenant.license_expiry;
        tenant.address = tenantData.address || tenant.address;
        tenant.contact_person = tenantData.contact_person || tenant.contact_person;
        tenant.is_active = tenantData.charging_stations || tenant.is_active;
        tenant.allow_remote_access = tenantData.allow_remote_access || tenant.allow_remote_access;
        tenant.max_user = tenantData.max_user || tenant.max_user;
        tenant.status = tenantData.status || tenant.status;

        return { data: await tenant.save(), message: "Tenant details updated" }
    } catch (error) {
        propogateError(error.message || "Error in finding tenant details!")
    }
}

const deleteTenant = async ({ deleteAll, tenantId }) => {
    try {
        if (deleteAll) {
            return { data: await tenantModel.deleteMany({}), message: "All Tenant Deleted" }
        }

        const tenant = await tenantModel.findById(tenantId)

        if (!tenant) {
            propogateError("Tenant Does Not Exist")
        }

        return { data: await tenantModel.deleteOne({ _id: tenantId }), message: "Tenant Deleted" }
    } catch (error) {
        propogateError(error.message || "Error in finding tenant details!")
    }
}

module.exports.getAllTenant = getAllTenant
module.exports.createNewTenant = createNewTenant
module.exports.updateTenant = updateTenant
module.exports.deleteTenant = deleteTenant