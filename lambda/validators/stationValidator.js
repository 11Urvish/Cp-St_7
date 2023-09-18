const Ajv = require("ajv")
const ajv = new Ajv()

const constants = require("../utils/constants")

const validatePostRequest = async (req, res, next) => {
    const postSchema = {
        $defs: {
            address: {
                $id: "address",
                type: "object",
                properties: {
                    address: { type: "string" },
                    city: { type: "string" },
                    state: { type: "string" },
                    country: { type: "string" },
                    postalCode: { type: "string" },
                    latitude: { type: "string" },
                    longitude: { type: "string" },
                },
                required: [
                    "address",
                    "city",
                    "state",
                    "country",
                    "postalCode",
                    "latitude",
                    "longitude"
                ]
            },
            info: {
                $id: "info",
                type: "object",
                properties: {
                    name: { type: "string" },
                    accessType: { type: "string" },
                    desc: { type: "string" },
                    address: { $ref: "./address" },
                    stationStatus: { type: "string" },
                    energyLimit: { type: "string" }
                },
                required: [
                    "name",
                    "accessType",
                    "desc",
                    "address",
                    "stationStatus",
                    "energyLimit"
                ]
            },
            timings: {
                $id: "timings",
                type: "object",
                properties: {
                    from: { type: "string" },
                    to: { type: "string" }
                },
                required: [
                    "from",
                    "to"
                ]
            },
            owner: {
                $id: "owner",
                type: "object",
                properties: {
                    name: { type: "string" },
                    number: { type: "string" },
                    email: { type: "string" },
                    address: { $ref: "../address" }
                },
                required: [
                    "name",
                    "number",
                    "email",
                    "address"
                ]
            }
        },
        type: "object",
        properties: {
            tenantId: { type: "string" },
            info: { $ref: "../info" },
            timings: { $ref: "../timings" },
            owner: { $ref: "../owner" },
            status : {type : "string"}
        },
        required: [
            // "tenantId",
            "info",
            "timings",
            "owner"
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
            stationId: { type: "string" }
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
        $defs: {
            address: {
                $id: "address",
                type: "object",
                properties: {
                    address: { type: "string" },
                    city: { type: "string" },
                    state: { type: "string" },
                    country: { type: "string" },
                    postalCode: { type: "string" },
                    latitude: { type: "string" },
                    longitude: { type: "string" },
                }
            },
            info: {
                $id: "info",
                type: "object",
                properties: {
                    name: { type: "string" },
                    accessType: { type: "string" },
                    desc: { type: "string" },
                    address: { $ref: "./address" },
                    stationStatus: { type: "string" },
                    energyLimit: { type: "string" }
                }
            },
            timings: {
                $id: "timings",
                type: "object",
                properties: {
                    from: { type: "string" },
                    to: { type: "string" }
                }
            },
            owner: {
                $id: "owner",
                type: "object",
                properties: {
                    name: { type: "string" },
                    number: { type: "string" },
                    email: { type: "string" },
                    address: { $ref: "../address" }
                }
            }
        },
        type: "object",
        properties: {
            stationId: { type: "string" },
            tenantId: { type: "string" },
            info: { $ref: "../info" },
            timings: { $ref: "../timings" },
            owner: { $ref: "../owner" },
            status: { type : "string" }
        },
        required: [
            "stationId"
        ],
        additionalProperties: false,
    }

    validateFunction(updateSchema, req.body, res, next)
}

const validateFunction = async (schema, data, res, next) => {
    const validate = ajv.compile(schema)
    const valid = validate(data)
    if (!valid) {
        console.log(validate.errors[0])
        return res.status(constants.HTTP_ERROR_CODE).json({ error: validate.errors[0].message || "Error" });
    }
    return next()
}

module.exports.validatePostRequest = validatePostRequest
module.exports.validateDeleteRequest = validateDeleteRequest
module.exports.validateUpdateRequest = validateUpdateRequest