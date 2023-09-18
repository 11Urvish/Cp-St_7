const Ajv = require("ajv")
const ajv = new Ajv()

const constants = require("../utils/constants")

const validatePostRequest = async (req, res, next) => {
    const postSchema = {
        type: "object",
        properties: {
            lastFourDigits: { type: "string" },
            expiryDate: { type: "string" },
            cardType: { type: "string" },
            token: { type: "string" },
            customerId: { type: "string" },
            status: { type: "string" }
        },
        required: [
            "lastFourDigits",
            "expiryDate",
            "cardType",
            "token",
            "customerId"
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

module.exports.validatePostRequest = validatePostRequest
