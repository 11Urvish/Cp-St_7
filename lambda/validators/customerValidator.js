const Ajv = require("ajv")
const ajv = new Ajv()

const constants = require("../utils/constants");

const validatePostPaginationRequest = async (req, res, next) => {
    const postSchema = {
        type: "object",
        properties: {
            limit: { type: "number" },
            page: { type: "number" },
        },
        required: [
            "limit",
            "page"
        ],
        additionalProperties: false,
    }

    validateFunction(postSchema, req.body, res, next)
};


const validatePostCustomerTransactionRequest = async (req, res, next) => {
    const postSchema = {
        type: "object",
        properties: {
            customerId: { type: "string" },
        },
        required: [
            "customerId"
        ],
        additionalProperties: false,
    }

    validateFunction(postSchema, req.body, res, next)
};

const validatePostRegisterRequest = async (req, res, next) => {
    const postSchema = {
        type: "object",
        properties: {
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string" },
            password: { type: "string" }
        },
        required: [
            "firstName",
            "lastName",
            "email",
            "password"
        ],
        additionalProperties: false,
    }

    validateFunction(postSchema, req.body, res, next)
};

const validatePostLoginRequest = async (req, res, next) => {
    const deleteSchema = {
        type: "object",
        properties: {
            email: { type: "string" },
            password: { type: "string" },
        },
        required: [
            "email",
            "password"
        ],
        additionalProperties: false
    }

    validateFunction(deleteSchema, req.body, res, next)
};

const validatePostChangePasswordRequest = async (req, res, next) => {
    const updateSchema = {
        type: "object",
        properties: {
            email: { type: "string" },
            password: { type: "string" },
        },
        required: [
            "email",
            "password"
        ],
        additionalProperties: false
    }

    validateFunction(updateSchema, req.body, res, next)
};

const validatePostForgotPasswordRequest = async (schema, data, res, next) => {
    const updateSchema = {
        type: "object",
        properties: {
            email: { type: "string" }
        },
        required: [
            "email"
        ],
        additionalProperties: false
    }

    validateFunction(updateSchema, req.body, res, next)
};

const validatePostProfileUpdateRequest = async (schema, data, res, next) => {
    const updateSchema = {
        type: "object",
        properties: {
            customerId: { type: "string" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            status: { type: "number" },

        },
        required: [
            "customerId",
            "firstName",
            "lastName",
            "status",
        ],
        additionalProperties: false
    }

    validateFunction(updateSchema, req.body, res, next)
};

const validatePostStatusUpdateRequest = async (schema, data, res, next) => {
    const updateSchema = {
        type: "object",
        properties: {
            customerId: { type: "string" },
            status: { type: "number" },
        },
        required: [
            "customerId",
            "status",
        ],
        additionalProperties: false
    }

    validateFunction(updateSchema, req.body, res, next)
};

const validateFunction = async (schema, data, res, next) => {
    const validate = ajv.compile(schema)
    const valid = validate(data)

    if (!valid) {
        console.log(validate.errors)
        return res.status(constants.HTTP_ERROR_CODE).json({ error: validate.errors[0].message });
    }
    return next()
}

module.exports.validatePostCustomerTransactionRequest = validatePostCustomerTransactionRequest;
module.exports.validatePostPaginationRequest = validatePostPaginationRequest;
module.exports.validatePostRegisterRequest = validatePostRegisterRequest;
module.exports.validatePostLoginRequest = validatePostLoginRequest;
module.exports.validatePostChangePasswordRequest = validatePostChangePasswordRequest;
module.exports.validatePostForgotPasswordRequest = validatePostForgotPasswordRequest;
module.exports.validatePostStatusUpdateRequest = validatePostStatusUpdateRequest;
module.exports.validatePostProfileUpdateRequest = validatePostProfileUpdateRequest;