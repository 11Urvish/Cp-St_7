const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { STATION_STATUS_INACTIVE } = require("../utils/constants");

const userSchema = new mongoose.Schema({
    role: String,
    isPhoneVerified: Boolean,
    isActive: Boolean,
    // favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Favorite' }],
    name: String,
    phone: Number,
    country_code: Number,
    password: String,
    email: String,
    picture: String,
    address: String,
    dob: Date,
    gender: String,
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
    termsAccepted: Boolean,
    status: { type: String, default: STATION_STATUS_INACTIVE }
}, {
    timestamps: true
});

userSchema.methods.setPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.setToken = function () {
    const token = jwt.sign(
        { email: this.email, role: this.role },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );
    return token
};

const userModel = mongoose.model("User", userSchema)

module.exports = userModel