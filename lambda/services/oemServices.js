const oemModel = require("../models/oemModel")
const { propogateError } = require("../utils/helper")

const getAllOem = async () => {
    try {
        return { data: await oemModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }), message: "Oem details" }
    } catch (error) {
        propogateError(error.message || "Error in finding OEM Details!")
    }
}

const createNewOem = async (oemData) => {
    try {
        const oem = new oemModel(oemData)
        const result = await oem.save()
        return { data: result, message: "Oem created successfully" }
    } catch (error) {
        propogateError(error.message || "Error in creating OEM Details!")
    }
}

const updateOem = async (oemData) => {
    try {
        const oem = await oemModel.findById(oemData.oemId)

        if (!oem) {
            propogateError("Oem Does Not Exist")
        }

        oem.name = oemData.name || oem.name
        oem.vendor = oemData.vendor || oem.vendor
        oem.input_voltage = oemData.input_voltage || oem.input_voltage
        oem.power_factor = oemData.power_factor || oem.power_factor
        oem.efficiency = oemData.efficiency || oem.efficiency
        oem.input_frequency = oemData.input_frequency || oem.input_frequency
        oem.wires = oemData.wires || oem.wires
        oem.ambient_temperature = oemData.ambient_temperature || oem.ambient_temperature
        oem.storage_temperature = oemData.storage_temperature || oem.storage_temperature
        oem.altitude = oemData.altitude || oem.altitude
        oem.humidity = oemData.humidity || oem.humidity
        oem.display = oemData.display || oem.display
        oem.language = oemData.language || oem.language
        oem.push_button = oemData.push_button || oem.push_button
        oem.user_authentication = oemData.user_authentication || oem.user_authentication
        oem.visual_indication = oemData.visual_indication || oem.visual_indication
        oem.protection = oemData.protection || oem.protection
        oem.charger_vehicle_communication = oemData.charger_vehicle_communication || oem.charger_vehicle_communication
        oem.charger_cms_communication = oemData.charger_cms_communication || oem.charger_cms_communication
        oem.ingress_protection = oemData.ingress_protection || oem.ingress_protection
        oem.enclosure_protection = oemData.enclosure_protection || oem.enclosure_protection
        oem.cooling = oemData.cooling || oem.cooling
        oem.wire_length = oemData.wire_length || oem.wire_length
        oem.dimension_w_h_d = oemData.dimension_w_h_d || oem.dimension_w_h_d
        oem.image = oemData.image || oem.image
        oem.plugs = oemData.plugs || oem.plugs
        oem.make = oemData.make || oem.make
        oem.status = oemData.status || oem.status

        return { data: await oem.save(), message: "Oem details updated" }
    } catch (error) {
        propogateError(error.message || "Error in updating OEM Details!")
    }
}

const deleteOem = async ({ deleteAll, oemId }) => {
    try {

        if (deleteAll) {
            return { data: await oemModel.deleteMany({}), message: "All Oem Deleted!" }
        }

        const model = await oemModel.findById(oemId)

        if (!model) {
            return { data: null, message: "Oem Does Not Exist" }
        }

        return { data: await oemModel.deleteOne({ _id: oemId }), message: "Oem Deleted" }
    } catch (error) {
        propogateError(error.message || "Error in deleting OEM Details!")
    }
}


module.exports.getAllOem = getAllOem
module.exports.createNewOem = createNewOem
module.exports.updateOem = updateOem
module.exports.deleteOem = deleteOem