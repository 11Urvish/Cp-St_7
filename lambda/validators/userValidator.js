const Ajv = require("ajv")
const ajv = new Ajv()

const constants = require("../utils/constants")

const validatePostRequest = async (req, res, next) => {
    const postSchema = {
        type: "object",
        properties: {
            firstname: { type: "string" },
            lastname: { type: "string" },
            email: {
                type: "string"
            },
            username: { type: "string" },
            password: { type: "string" },
            role: { type: "string" },
            tenantId: { type: "string" },
            country: { type: "string" },
            zipcode: { type: "string" },
            status: { type: "string" }
        },
        required: [
            "firstname",
            "lastname",
            "email",
            "username",
            "password",
            "role",
            "country",
            "zipcode",
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
            userId: { type: "string" }
        },
        required: [
            "deleteAll"
        ],
        additionalProperties: false
    }

    validateFunction(deleteSchema, req.body, res, next)
}

const validateUpdateRequest = async (req, res, next) => {
    const updateSchema = {
        type: "object",
        properties: {
            userId: { type: "string" },
            firstname: { type: "string" },
            lastname: { type: "string" },
            email: { type: "string" },
            username: { type: "string" },
            role: { type: "string" },
            tenantId: { type: "string" },
            password: { type: "string" },
            country: { type: "string" },
            zipCode: { type: "string" },
            status: { type: "string" }
        },
        required: [
            "userId"
        ],
        additionalProperties: false
    }

    validateFunction(updateSchema, req.body, res, next)
}

const validateLoginRequest = async (req, res, next) => {
    const loginSchema = {
        type: "object",
        properties: {
            email: { type: "string" },
            password: { type: "string" }
        },
        required: [
            "email",
            "password"
        ],
        additionalProperties: false
    }

    validateFunction(loginSchema, req.body, res, next)
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
module.exports.validateLoginRequest = validateLoginRequest