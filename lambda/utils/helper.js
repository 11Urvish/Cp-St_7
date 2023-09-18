const AJV = require('ajv').default;
const addFormats = require('ajv-formats').default;
const { HTTP_SUCCESS_CODE, HTTP_ERROR_CODE } = require("./constants")

const successResponse = (res, data, message) => {
    return res.status(HTTP_SUCCESS_CODE).send({
        success: true,
        message: message,
        data: data
    })

}

const errorResponse = (res, error) => {
    return res.status(HTTP_ERROR_CODE).send({
        success: false,
        message: error.message
    })
}

const propogateError = (error) => {
    console.log(error)
    throw new Error(error)
}

const generateId = (length) => {
    const randomId = Math.random().toString(36).substring(2, 3 + length);

    return randomId.toUpperCase()
}


const validateSchema = (schemaName, body) => {
    const ajv = new AJV();
    addFormats(ajv);

    const { schema } = require(`../schemas/${schemaName}.js`)

    const valid = ajv.validate(schema, body);

    if (!valid) {
        console.log("Validation Error")
        console.error(ajv.errors);
        return false;
    }

    console.log("Validation Success")
    return true;
}

exports.successResponse = successResponse
exports.errorResponse = errorResponse
exports.propogateError = propogateError
exports.generateId = generateId
exports.validateSchema = validateSchema
