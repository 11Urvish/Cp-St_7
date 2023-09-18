const Ajv = require("ajv")
const ajv = new Ajv()

const constants = require("../utils/constants")

const validatePostRequest = async (req, res, next) => {
    const postSchema = {
        type: "object",
        properties: {
            tenantId: { type: "string" },
            chargerId: { type: "string" }
        },
        required: [
            "tenantId",
            "chargerId"
        ],
        additionalProperties: false
    }

    validateFunction(postSchema, req.body, res, next)
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