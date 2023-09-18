const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const customerSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, default: 1 },
    custStripeId: { type: String, default: null },
    payMethodIds: { type: [mongoose.Schema.Types.ObjectId], ref: "PaymentMethod" },
    transactionIds: { type: [mongoose.Schema.Types.ObjectId], ref: "Transaction" },
  },
  {
    timestamps: true,
  }
);

customerSchema.methods.generatePassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

customerSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

customerSchema.methods.setToken = function () {
  const token = jwt.sign({ id: this._id, email: this.email }, process.env.TOKEN_KEY, {
    expiresIn: "2h",
  });
  return token;
};

const customerModel = mongoose.model("Customer", customerSchema);

module.exports = customerModel;
