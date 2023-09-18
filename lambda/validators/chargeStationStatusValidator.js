const Ajv = require("ajv")
const ajv = new Ajv()

const constants = require("../utils/constants")

const validatePostRequest = async (req, res, next) => {
    const postSchema = {
        type: "object",
        properties: {
            name: { type: "string" },
            station: { type: "string" },
            status: { type: "string" }
        },
        required: [
            "name",
            "station"
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
            chargeStationStatusId: { type: "string" }
        },
        required: [
            "deleteAll",
            "chargeStationStatusId"
        ],
        additionalProperties: false
    }

    validateFunction(deleteSchema, req.body, res, next)
}

const validateUpdateRequest = async (req, res, next) => {
    const updateSchema = {
        type: "object",
        properties: {
            chargeStationStatusId: { type: "string" },
            name: { type: "string" },
            station: { type: "string" },
            status: { type: "string" }
        },
        required: [
            "chargeStationStatusId" 
        ],
        additionalProperties: false
    }

    validateFunction(updateSchema, req.body, res, next)
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