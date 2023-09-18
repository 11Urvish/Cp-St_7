const Ajv = require("ajv")
const ajv = new Ajv()

const constants = require("../utils/constants")

const validatePostRequest = async (req, res, next) => {
    const postSchema = {
        type: "object",
        properties: {
            name: { type: "string" },
            access_type: { type: "string" },
            address: { type: "string" },
            location: {
                lat: { type: "integer" },
                lng: { type: "integer" }
            },
            countryCode: { type: "string" },
            timing_type: { type: "string" },
            description: { type: "string" },
            contact_person: { type: "string" },
            country: { type: "string" },
            state: { type: "string" },
            city: { type: "string" },
            area: { type: "string" },
            pinCode: { type: "integer" },
            show_on_mobile_app: { type: "boolean" },
            tenant: { type: "string" },


        },
        required: [
            'name',
            'access_type',
            'address', 'location',
            'countryCode',
            'timing_type',
            'description',
            'contact_person',
            'country',
            'state',
            'city',
            'area',
            'pinCode',
            'show_on_mobile_app',
            'tenant'
        ],
        additionalProperties: false,
    }

    validateFunction(postSchema, req.body, res, next)
}

const validateDeleteRequest = async (req, res, next) => {
    const deleteSchema = {
        type: "object",
        properties: {

            chargingStationId: { type: "string" }
        },
        required: [
            'chargingStationId'
        ],
        additionalProperties: false
    }

    validateFunction(deleteSchema, req.body, res, next)
}

const validateUpdateRequest = async (req, res, next) => {
    const updateSchema = {
        type: "object",
        properties: {
            name: { type: "string" },
            access_type: { type: "string" },
            address: { type: "string" },
            location: {
                lat: { type: "integer" },
                lng: { type: "integer" }
            },
            countryCode: { type: "string" },
            timing_type: { type: "string" },
            description: { type: "string" },
            contact_person: { type: "string" },
            country: { type: "string" },
            state: { type: "string" },
            city: { type: "string" },
            area: { type: "string" },
            pinCode: { type: "integer" },
            show_on_mobile_app: { type: "boolean" },
            tenant: { type: "string" },


        },
        required: [
            'chargingStationId'
        ],
        additionalProperties: true
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