const Ajv = require("ajv")
const ajv = new Ajv()

const constants = require("../utils/constants")

const validatePostRequest = async (req, res, next) => {
    const postSchema = {
        type: "object",
        properties: {
            name: { type: "string" },
            status: { type: "string" }
        },
        required: [
            "name"
        ],
        additionalProperties: false,
    }

    validateFunction(postSchema, req.body, res, next)
}


const validatePatchRequest = async (req, res, next) => {
    const postSchema = {
        type: "object",
        properties: {
            oemVendorId: { type: "string" },
            name: { type: "string" },
            status: { type: "string" }
        },
        required: [
            "oemVendorId"
        ],
        additionalProperties: false,
    }

    validateFunction(postSchema, req.body, res, next)
}

const validateDeleteRequest = async (req, res, next) => {
    const postSchema = {
        type: "object",
        properties: {
            deleteAll: { type: "boolean" },
            oemVendorId: { type: "string" }
        },
        required: [
            "deleteAll"
        ],
        additionalProperties: false,
    }

    validateFunction(postSchema, req.body, res, next)
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

module.exports = {
    validatePostRequest,
    validatePatchRequest,
    validateDeleteRequest
}