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
                    country: { type: "string" },
                    state: { type: "string" },
                    city: { type: "string" },
                    area: { type: "string" },
                    details: { type: "string" },
                    pincode: { type: "integer" },
                }
            }
        },
        type: "object",
        properties: {
            mode: { type: "string" },
            licenses: { type: "string" },
            charging_stations: { type: "integer" },
            chargers: { type: "integer" },
            name: { type: "string" },
            license_expiry: { type: "string" },
            address: { $ref: "../address" },
            // address: { type: "string" },
            contact_person: { type: "string" },
            is_active: { type: "boolean" },
            allow_remote_access: { type: "boolean" },
            max_user: { type: "integer" },
            status: { type: "string" },

        },
        required: [
            'mode',
            'charging_stations',
            'chargers',
            'name',
            'license_expiry',
            'address',
            'contact_person',
            'is_active',
            'allow_remote_access',
            'max_user',
        ],
        additionalProperties: false,
    }

    validateFunction(postSchema, req.body, res, next)
}

const validateDeleteRequest = async (req, res, next) => {
    const deleteSchema = {
        type: "object",
        properties: {

            tenantId: { type: "string" }
        },
        required: [
            'tenantId'
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
                    country: { type: "string" },
                    state: { type: "string" },
                    city: { type: "string" },
                    area: { type: "string" },
                    details: { type: "string" },
                    pincode: { type: "integer" },
                }
            }
        },
        type: "object",
        properties: {
            tenantId: { type: "string" },
            mode: { type: "string" },
            licenses: { type: "string" },
            charging_stations: { type: "integer" },
            chargers: { type: "integer" },
            name: { type: "string" },
            license_expiry: { type: "string" },
            address: { $ref: "../address" },
            // address: { type: "string" },
            contact_person: { type: "string" },
            is_active: { type: "boolean" },
            allow_remote_access: { type: "boolean" },
            max_user: { type: "integer" },
            status: { type: "string" },


        },
        required: [
            'tenantId',
            'mode',
            'charging_stations',
            'chargers',
            'name',
            'license_expiry',
            'address',
            'contact_person',
            'is_active',
            'allow_remote_access',
            'max_user'
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