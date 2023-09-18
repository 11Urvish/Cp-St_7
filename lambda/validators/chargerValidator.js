const Ajv = require("ajv")
const ajv = new Ajv()

const constants = require("../utils/constants")

const validatePostRequest = async (req, res, next) => {
    const postSchema = {
        $defs: {
            connectors: {
                $id: "connectors",
                type: "object",
                properties: {
                    name: { type: "string" },
                    connector_id: { type: "string" },
                    status: { type: "string" },
                    oem_ref: { type: "string" },
                    tarrif: { type: "string" },
                }
            }
        },
        type: "object",
        properties: {
            stationId: { type: "string" },
            is_active: { type: "string" },
            parking_restrictions: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            charger_id: { type: "string" },
            oem: { type: "string" },
            connectors: { type: "string" },
            tenant: { type: "string" },
            charging_station: { type: "string" },
            access_type: { type: "string" },
            timing_type: { type: "string" },
            per_unit_rates: { type: "string" },
            comments: { type: "string" },
            cooldown_time: { type: "string" },
            charging_speed: { type: "string" },
            energy_limits: { type: "string" },
            settings: { type: "string" },
            is_enabled: { type: "string" },
            otp_verification: { type: "string" },
            charger_status: { type: "string" },
            status: { type: "string" },
        },
        required: [
            "stationId",
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
            stationId: { type: "string" },
            chargerId: { type: "string" }
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
            chargerId: { type: "string" },
            stationId: { type: "string" },
            chargeSpotName: { type: "string" },
            desc: { type: "string" },
            cooldownTime: { type: "string" },
            oem: { type: "string" },
            tariff: { type: "string" },
            chargingSpeed: { type: "string" },
            installationDate: { type: "string" },
            status: { type: "string" }
        },
        required: [
            "chargerId"
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