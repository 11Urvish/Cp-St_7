const connectorTypeModel = require("../models/connectorTypeModel")
const { propogateError } = require("../utils/helper")

const getAllConnectorType = async () => {
    try {
        return { data: await connectorTypeModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }), message: "Connector Type details!" }
    } catch (error) {
        propogateError(error.message || "Error in finding Connector Type!")
    }
}


const createConnectorType = async (connectorTypeData) => {
    try {
        const connectorType = new connectorTypeModel(connectorTypeData)
        const result = await connectorType.save()
        return { data: result, message: "Connector Type created successfully!" }
    } catch (error) {
        propogateError(error.message || "Error in creating Connector Type!")
    }
}

const updateConnectorType = async (connectorTypeData) => {
    try {
        const connectorType = await connectorTypeModel.findById(connectorTypeData.connectorTypeId)

        if (!connectorType) {
            propogateError("Connector Type does not exist!")
        }

        connectorType.name = connectorTypeData.name || connectorType.name
        connectorType.description = connectorTypeData.description || connectorType.description
        connectorType.icon = connectorTypeData.icon || connectorType.icon
        connectorType.connector_mode = connectorTypeData.connector_mode || connectorType.connector_mode
        connectorType.connector_standard = connectorTypeData.connector_standard || connectorType.connector_standard
        connectorType.status = connectorTypeData.status || connectorType.status

        return { data: await connectorType.save(), message: "Connector Type details updated!" }
    } catch (error) {
        propogateError(error.message || "Error in updating Connector Type!")
    }
}
const deleteConnectorType = async ({ deleteAll, connectorTypeId }) => {

    try {

        if (deleteAll) {
            return { data: await connectorTypeModel.deleteMany({}), message: "All Connector Type Deleted!" }
        }

        const connectorType = await connectorTypeModel.findById(connectorTypeId)

        if (!connectorType) {
            propogateError("Connector Type does not exist!")
        }

        return { data: await connectorTypeModel.deleteOne({ _id: connectorTypeId }), message: "Connector Type Deleted!" }
    } catch (error) {
        propogateError(error.message || "Error in deleting Connector Type!")
    }
}

module.exports.getAllConnectorType = getAllConnectorType
module.exports.createConnectorType = createConnectorType
module.exports.updateConnectorType = updateConnectorType
module.exports.deleteConnectorType = deleteConnectorType