const Ajv = require("ajv")
const ajv = new Ajv()

const constants = require("../utils/constants")

const validatePostRequest = async (req, res, next) => {
    const postSchema = {
        type: "object",
        properties: {
            chargerId: { type: "string" },
            type: { type: "string" },
            tariff: { type: "string" },
            maxPower: { type: "string" },
            current: { type: "string" },
            phases: { type: "string" },
            status: { type: "string" }
        },
        required: [
            "chargerId",
            "type",
            "tariff",
            "maxPower",
            "current",
            "phases"
        ],
        additionalProperties: false,
    }

    validateFunction(postSchema, req.body, res, next)
}

const validateDeleteRequest = async (req, res, next) => {
    const deleteSchema = {
        type: "object",
        properties: {
            deleteAll: { type: "boolean" },
            chargerId: { type: "string" },
            connectorId: { type: "string" }
        },
        additionalProperties: false
    }

    validateFunction(deleteSchema, req.body, res, next)
}

const validateUpdateRequest = async (req, res, next) => {
    const updateSchema = {
        type: "object",
        properties: {
            connectorId: { type: "string" },
            chargerId: { type: "string" },
            type: { type: "string" },
            tariff: { type: "string" },
            maxPower: { type: "string" },
            current: { type: "string" },
            phases: { type: "string" },
            status: { type: "string" }
        },
        required: [
            "connectorId"
        ],
        additionalProperties: false,
    }

    validateFunction(updateSchema, req.body, res, next)
}

const validateStartTransactionRequest = (req, res, next) => {
    const startTransactionSchema = {
        type: "object",
        properties: {
            tenantId: { type: "string" },
            chargerId: { type: "string" },
            idTag: { type: "string" },
            connectorId: { type: "integer" }
        },
        required: [
            "tenantId",
            "chargerId",
            "idTag",
            "connectorId"
        ],
        additionalProperties: false,
    }

    validateFunction(startTransactionSchema, req.body, res, next)
}

const validateStopTransactionRequest = (req, res, next) => {
    const stopTransactionSchema = {
        type: "object",
        properties: {
            tenantId: { type: "string" },
            chargerId: { type: "string" },
            transactionId: { type: "integer" }
        },
        required: [
            "tenantId",
            "chargerId",
            "transactionId"
        ],
        additionalProperties: false,
    }

    validateFunction(stopTransactionSchema, req.body, res, next)
}

const validateFunction = async (schema, data, res, next) => {
    const validate = ajv.compile(schema)
    const valid = validate(data)

    if (!valid) {
        console.log(validate.errors)
        return res.status(constants.HTTP_ERROR_CODE).json({ error: validate.errors[0].message });
    }
    return next()
}

module.exports.validatePostRequest = validatePostRequest
module.exports.validateDeleteRequest = validateDeleteRequest
module.exports.validateUpdateRequest = validateUpdateRequest
module.exports.validateStartTransactionRequest = validateStartTransactionRequest
module.exports.validateStopTransactionRequest = validateStopTransactionRequest