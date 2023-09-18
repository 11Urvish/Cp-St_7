const Ajv = require("ajv")
const ajv = new Ajv()

const constants = require("../utils/constants")

const validatePostRequest = async (req, res, next) => {
    const postSchema = {
        type: "object",
        $defs: {
            plug: {
                $id: "plug",
                type: "object",
                properties: {
                    type: { type: "string" },
                    connector_type: { type: "string" },
                    charge_speed: { type: "string" },
                    name: { type: "string" },
                    code: { type: "string" },
                    current: { type: "string" },
                    rating: { type: "string" },
                    number: { type: "string" },
                    format: { type: "string" },
                    power_type: { type: "string" },
                    max_voltage: { type: "string" },
                },
                required: [
                    "type",
                    "connector_type",
                    "charge_speed",
                    "name",
                    "code",
                    "current",
                    "rating",
                    "number",
                    "format",
                    "power_type",
                    "max_voltage",
                ],
                additionalProperties: false
            }
        },
        properties: {
            name: { type: "string" },
            vendor: { type: "string" },
            input_voltage: { type: "string" },
            power_factor: { type: "string" },
            efficiency: { type: "string" },
            input_frequency: { type: "string" },
            wires: { type: "string" },
            ambient_temperature: { type: "string" },
            storage_temperature: { type: "string" },
            altitude: { type: "string" },
            humidity: { type: "string" },
            display: { type: "string" },
            language: { type: "string" },
            push_button: { type: "string" },
            user_authentication: { type: "string" },
            visual_indication: { type: "string" },
            protection: { type: "string" },
            charger_vehicle_communication: { type: "string" },
            charger_cms_communication: { type: "string" },
            ingress_protection: { type: "string" },
            enclosure_protection: { type: "string" },
            cooling: { type: "string" },
            wire_length: { type: "string" },
            dimension_w_h_d: { type: "string" },
            image: { type: "string" },
            plugs: { $ref: "../plug" },
            make: { type: "string" },
            status: { type: "string" },
        },
        required: [
            "name",
            "vendor",
            "input_voltage",
            "power_factor",
            "efficiency",
            "input_frequency",
            "wires",
            "ambient_temperature",
            "storage_temperature",
            "altitude",
            "humidity",
            "display",
            "language",
            "push_button",
            "user_authentication",
            "visual_indication",
            "protection",
            "charger_vehicle_communication",
            "charger_cms_communication",
            "ingress_protection",
            "enclosure_protection",
            "cooling",
            "wire_length",
            "dimension_w_h_d",
            "image",
            "make"
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
            oemId: { type: "string" }
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
        $defs: {
            plug: {
                $id: "plug",
                type: "object",
                properties: {
                    type: { type: "string" },
                    connector_type: { type: "string" },
                    charge_speed: { type: "string" },
                    name: { type: "string" },
                    code: { type: "string" },
                    current: { type: "string" },
                    rating: { type: "string" },
                    number: { type: "string" },
                    format: { type: "string" },
                    power_type: { type: "string" },
                    max_voltage: { type: "string" },
                },
                required: [
                    "type",
                    "connector_type",
                    "charge_speed",
                    "name",
                    "code",
                    "current",
                    "rating",
                    "number",
                    "format",
                    "power_type",
                    "max_voltage",
                ],
                additionalProperties: false
            }
        },
        properties: {
            oemId: { type: "string" },
            name: { type: "string" },
            vendor: { type: "string" },
            input_voltage: { type: "string" },
            power_factor: { type: "string" },
            efficiency: { type: "string" },
            input_frequency: { type: "string" },
            wires: { type: "string" },
            ambient_temperature: { type: "string" },
            storage_temperature: { type: "string" },
            altitude: { type: "string" },
            humidity: { type: "string" },
            display: { type: "string" },
            language: { type: "string" },
            push_button: { type: "string" },
            user_authentication: { type: "string" },
            visual_indication: { type: "string" },
            protection: { type: "string" },
            charger_vehicle_communication: { type: "string" },
            charger_cms_communication: { type: "string" },
            ingress_protection: { type: "string" },
            enclosure_protection: { type: "string" },
            cooling: { type: "string" },
            wire_length: { type: "string" },
            dimension_w_h_d: { type: "string" },
            image: { type: "string" },
            plugs: { $ref: "../plug" },
            make: { type: "string" },
            status: { type: "string" },
        },
        required: [
            "oemId"
        ],
        additionalProperties: false,
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