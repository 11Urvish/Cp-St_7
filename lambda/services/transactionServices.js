const TransactionModel = require("../models/transactionModel");
const CustomerModel = require("../models/customerModel");

const getAllTransaction = async () => {
    try {
        return { data: await TransactionModel.find({}, { createdAt: 0, updatedAt: 0, __v: 0 }), message: "Transaction details" };
    } catch (error) {
        throw new Error(error.message || "Error in finding Transactions!")
    }
}

const createNewTransaction = async (transactionData) => {
    try {
        const transactionModel = new TransactionModel(transactionData);

        const transaction = await transactionModel.save();

        if (!transaction) {
            throw new Error("Transaction creation failed")
        }

        const customer = await CustomerModel.findById(params.customerId);
        customer.transactionIds.push(transaction._id);
        await customer.save();

        return { data: transaction, message: "Transaction created successfully" };
    } catch (error) {
        throw new Error(error.message || "Error in creating Transactions!")
    }
}

module.exports.getAllTransaction = getAllTransaction;
module.exports.createNewTransaction = createNewTransaction;
