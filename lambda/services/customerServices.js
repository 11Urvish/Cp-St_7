const customerModel = require("../models/customerModel");
const transactionModel = require("../models/transactionModel");
const { propogateError } = require("../utils/helper");


const getAllCustomers = async (params) => {
    try {
        const { page, limit } = params;
        const pageInt = parseInt(page, 10);
        const limitInt = parseInt(limit, 10);
        const skip = (pageInt - 1) * limitInt;
        const filterQuery = [
            {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    status: 1
                },
            },
            { $skip: skip },
            { $limit: limitInt },
        ];

        const count = await customerModel.countDocuments();
        const result = await customerModel.aggregate(filterQuery);

        return {
            data: {
                customers: result,
                totalCount: count
            }, message: "Customers details!"
        }
    } catch (error) {
        propogateError(error.message || "Error in finding Customer details!")
    }
}

const getCustomerTransaction = async ({ customerId }) => {
    try {
        const customer = await customerModel.findById(customerId, { createdAt: 0, updatedAt: 0, __v: 0 })
        if (!customer) {
            propogateError("Customer does not exist!")
        }

        return { data: await transactionModel.find({ customerId: customerId }), message: "Get all CustomerTransaction data!" };
    } catch (error) {
        propogateError(error.message || "Error in getting customer transaction details!")
    }
}

const register = async (customerData) => {
    try {
        const customer = new customerModel(customerData)

        customer.password = await customer.generatePassword(customerData.password)

        return { data: await customer.save(), message: "Customer Created successfully!" }
    } catch (error) {
        propogateError(error.message || "Error in getting customer transaction details!")
    }
}

const login = async (customerData) => {
    try {
        const { email, password } = customerData;
        const customer = await customerModel.findOne({ email: email })

        if (!customer || !await customer.validatePassword(password)) {
            propogateError("Invalid username / password!")
        }

        const result = {
            id: customer._id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            status: customer.status,
            token: customer.setToken()
        }

        return { data: result, message: "Logged in successfully!" }
    } catch (error) {
        propogateError(error.message || "Error in login!")
    }
}

const forgotPassword = async ({ email }) => {
    try {
        const customer = await customerModel.findOne({ email: email })

        if (!customer) {
            propogateError("Customer not found!")
        }

        // sent mail code here
        return { data: null, message: "Forgot password link sent to your register email!" }
    } catch (error) {
        propogateError(error.message || "Some error occured!")
    }
}

const changePassword = async ({ email, password }) => {
    try {
        const customer = await customerModel.findOne({ email: email })

        if (!customer) {
            propogateError("Customer not found!")
        }

        customer.password = await customer.generatePassword(password)

        await customer.save()

        return { data: customer, message: "Updated password successfully!" }
    } catch (error) {
        propogateError(error.message || "Error in changing password!")
    }
}

const profileUpdate = async (customerData) => {
    try {
        const customer = await customerModel.findById({ _id: customerData.customerId });

        if (!customer) {
            propogateError("Customer not found!")
        }

        customer.firstName = customerData.firstName || customer.firstName
        customer.lastName = customerData.lastName || customer.lastName
        customer.email = customerData.email || customer.email
        customer.password = customerData.password || customer.password

        return { data: await customer.save(), message: "Customer profile updated!" }
    } catch (error) {
        propogateError(error.message || "Error in updating customer profile!")
    }
}

const updateStatus = async ({ customerId, status }) => {
    try {
        const customer = await customerModel.findById({ _id: customerId });

        if (!customer) {
            propogateError("Customer not found!")
        }

        customer.status = status || customer.status

        return { data: await customer.save(), message: "Update Status Successfully!" }
    } catch (error) {
        propogateError(error.message || "Error in updating customer status!")
    }
}


module.exports.getAllCustomers = getAllCustomers;
module.exports.getCustomerTransaction = getCustomerTransaction;
module.exports.register = register;
module.exports.login = login;
module.exports.forgotPassword = forgotPassword;
module.exports.changePassword = changePassword;
module.exports.profileUpdate = profileUpdate;
module.exports.updateStatus = updateStatus;